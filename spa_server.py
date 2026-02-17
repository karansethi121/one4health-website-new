import http.server
import socketserver
import os
import sys

PORT = 8000
DIRECTORY = "/Users/karansethi/Downloads/app/dist"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        # Check if the requested path exists as a file or directory
        path = self.translate_path(self.path)
        if not os.path.exists(path):
            # If it doesn't exist, serve index.html (SPA routing)
            self.path = "/index.html"
        return super().do_GET()

if __name__ == "__main__":
    os.chdir(DIRECTORY)
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Serving SPA at http://localhost:{PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nStopping server.")
            sys.exit(0)
