
http {
  index    index.html index.htm;

  server { 
    listen       8080;
    server_name  localhost;
    
    # serve static files
    location /  {
      root    /usr/local/var/www;
    }
  }
}