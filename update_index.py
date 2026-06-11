import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove tailwind cdn
content = re.sub(r'<script src="https://cdn\.tailwindcss\.com\?plugins=forms,container-queries"></script>\n?', '', content)

# Remove tailwind config
content = re.sub(r'<script id="tailwind-config">.*?</script>\n?', '', content, flags=re.DOTALL)

# Remove all <style> tags
content = re.sub(r'<style>.*?</style>\n?', '', content, flags=re.DOTALL)

# Remove custom scripts that we moved to main.js
content = re.sub(r'<script>\s*document\.addEventListener\("DOMContentLoaded".*?</script>\n?', '', content, flags=re.DOTALL)
content = re.sub(r'<script>\s*document\.addEventListener\(\'mousemove\'.*?</script>\n?', '', content, flags=re.DOTALL)

# Add module script before </head>
if '<script type="module" src="/src/main.js"></script>' not in content:
    content = content.replace('</head>', '    <script type="module" src="/src/main.js"></script>\n</head>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("index.html updated successfully")
