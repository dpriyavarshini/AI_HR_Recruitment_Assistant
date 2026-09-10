$ports = 5173..5185
$listener = $null
$activePort = $null

foreach ($p in $ports) {
    try {
        $l = New-Object System.Net.HttpListener
        $l.Prefixes.Add("http://localhost:$p/")
        $l.Start()
        $listener = $l
        $activePort = $p
        Write-Host "TalentPulse AI Web App Server successfully started on http://localhost:$activePort/"
        break
    } catch {
        # Try next port
    }
}

if (-not $listener) {
    Write-Host "Error: Could not bind HttpListener to any port between 5173 and 5185."
    exit 1
}

$htmlPath = Join-Path $PSScriptRoot "index.html"

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        # CORS & Cache Headers
        $response.Headers.Add("Access-Control-Allow-Origin", "*")
        $response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        $response.Headers.Add("Access-Control-Allow-Headers", "Content-Type")
        $response.Headers.Add("Cache-Control", "no-cache, no-store, must-revalidate")
        $response.Headers.Add("Pragma", "no-cache")

        if ($request.HttpMethod -eq "OPTIONS") {
            $response.StatusCode = 200
            $response.Close()
            continue
        }

        # Serve index.html for root or unknown routes
        if (Test-Path $htmlPath) {
            $bytes = [System.IO.File]::ReadAllBytes($htmlPath)
            $response.ContentType = "text/html; charset=utf-8"
            $response.ContentLength64 = $bytes.Length
            if ($request.HttpMethod -ne "HEAD") {
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            }
            $response.OutputStream.Close()
        } else {
            $response.StatusCode = 404
            $response.Close()
        }
    } catch {
        Write-Host "Request error: $_"
    }
}
