# Manual Server Start Guide

## Quick Start (Choose one method)

### Method 1: Test Server (No MongoDB required)
1. Open Command Prompt (cmd)
2. Navigate to project: `cd c:\PRTU\PRTU-TS-WEB`
3. Run: `node test-server.js`
4. Open another Command Prompt and run: `npm run dev`

### Method 2: Full Server with MongoDB
1. Open Command Prompt (cmd)
2. Navigate to project: `cd c:\PRTU\PRTU-TS-WEB`
3. Run: `node server-js.js`
4. Open another Command Prompt and run: `npm run dev`

### Method 3: Use Batch Files
- Double-click `start-test.bat` for test server
- Double-click `start-simple.bat` for full server

## Expected Output

### Backend Server:
```
🚀 Server running on port 5000
📊 Health check: http://localhost:5000/health
💬 API endpoint: http://localhost:5000/api
```

### Frontend Server:
```
Local:   http://localhost:5173/
Network: use --host to expose
```

## Testing
1. Go to http://localhost:5173
2. Check if the server status shows "Online" (green dot)
3. Try posting a comment

## Troubleshooting
- If you see "Offline" status, the backend isn't running
- Check Command Prompt windows for error messages
- Make sure no other application is using port 5000
- If MongoDB fails, the server will still work with mock data
