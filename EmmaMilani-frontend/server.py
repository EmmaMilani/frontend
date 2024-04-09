from http.server import HTTPServer, BaseHTTPRequestHandler 
import json 
from class_product import Product
     
class APIHandler(BaseHTTPRequestHandler): 
    
    def do_GET(self):
        if self.path == '/products':
            products = Product.fetchAll()
            products_list = []
            for p in products:
                product_dict={
                   'type':'products',
                   'id': p[0],
                   'attributes':{
                       'nome':p[1],
                       'marca':p[2],
                       'prezzo':p[3]
                    }
                }
                products_list.append(product_dict)
            
            self.send_response(200) 
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'data': products_list}).encode('utf-8'))  
        elif self.path.startswith('/products/'):
            parts = self.path.split('/')
            product = Product.find(int(parts[2]))
            print(product)
            if(product != None):
                product_dict = {
                    "type": "products",
                    "id": product.id,  
                    "attributes": {
                        "nome": product.nome,
                        "marca": product.marca, 
                        "prezzo": product.prezzo
                    }
                }
                self.send_response(200) 
                self.send_header('Content-Type', 'application/json')
                self.end_headers() 
                self.wfile.write(json.dumps({'data': product_dict}).encode('utf-8'))
            else:
                self.send_response(404) 
                
    def do_POST(self):
        if self.path == '/products':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            try:
                data = json.loads(post_data.decode('utf-8'))
                if 'data' not in data or 'attributes' not in data['data'] or 'nome' not in data['data']['attributes'] or 'prezzo' not in data['data']['attributes'] or 'marca' not in data['data']['attributes']:
                    self.send_error(400, 'Bad Request - Incomplete Data')
                    return
                new_product = {
                    'nome': data['data']['attributes']['nome'],
                    'marca': data['data']['attributes']['marca'],
                    'prezzo': data['data']['attributes']['prezzo']
                }
                product = Product.Create(new_product)
                
                response = {
                    "data": {
                        "type": "products",
                        "id": product.id,  
                        "attributes": {
                            "nome": product.nome,
                            "marca": product.marca,
                            "prezzo": product.prezzo  
                        }
                    }
                }
                
                self.send_response(201)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps(response).encode('utf-8'))
            except json.JSONDecodeError:
                self.send_error(400, 'Bad Request')
                
    def do_PATCH(self):
        if self.path.startswith('/products/'):
            parts = self.path.split('/')
            product = Product.find(int(parts[2]))
            if(product != None):
                try:
                    content_length = int(self.headers['Content-Length'])
                    patch_data = self.rfile.read(content_length)
                    data = json.loads(patch_data.decode('utf-8'))
                    if 'data' not in data or 'attributes' not in data['data'] or 'nome' not in data['data']['attributes'] or 'prezzo' not in data['data']['attributes'] or 'marca' not in data['data']['attributes']:
                        self.send_error(400, 'Bad Request - Incomplete Data')
                        return
                    
                    product_data = {
                        'nome': data['data']['attributes']['nome'],
                        'marca': data['data']['attributes']['marca'],
                        'prezzo': data['data']['attributes']['prezzo']
                    }
                    product.update(product_data)
                    product = Product.find(product.id)
                    if(product != None):
                        response = {
                            "data": {
                                "type": "products",
                                "id": product.id,  
                                "attributes": {
                                    "nome": product.nome,
                                    "marca": product.marca,
                                    "prezzo": product.prezzo 
                                }
                            }
                        }
                    self.send_response(200) 
                    self.send_header('Content-Type', 'application/json')
                    self.end_headers() 
                    self.wfile.write(json.dumps(response).encode('utf-8'))
                except Exception as e:
                    self.send_error(500, f'Server Error:{str(e)}')
                    
    def do_DELETE(self):
        if self.path.startswith('/products/'):
            parts = self.path.split('/')
            product = Product.find(int(parts[2]))
            if product!=None:
                try:    
                    product.delete()
                    self.send_response(204) # No Content
                    self.send_header('Content-Type', 'application/json')
                    self.end_headers()
                except Exception as e:
                    self.send_error(404, 'Not Found')
            else:
                self.send_error(404, 'Not Found')
                     
def run(server_class=HTTPServer, handler_class=APIHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print('Starting server...')
    httpd.serve_forever()

if __name__ == '__main__':
    run()