# Minimal static file server for local preview of Persian FX dashboard
param([int]$Port = 5177)

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "Persian FX dashboard serving $root on http://localhost:$Port/"

$mime = @{
  ".html" = "text/html; charset=utf-8"; ".css" = "text/css; charset=utf-8";
  ".js" = "application/javascript; charset=utf-8"; ".json" = "application/json; charset=utf-8";
  ".svg" = "image/svg+xml"; ".png" = "image/png"; ".ico" = "image/x-icon";
}

try {
  while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    try {
      $req = $ctx.Request
      $res = $ctx.Response
      $res.KeepAlive = $false
      $res.Headers.Add("Connection", "close")
      $path = [System.Uri]::UnescapeDataString($req.Url.AbsolutePath)
      if ($path -eq "/") { $path = "/index.html" }
      $file = Join-Path $root ($path.TrimStart("/") -replace "/", "\")

      if (Test-Path $file -PathType Leaf) {
        $ext = [System.IO.Path]::GetExtension($file).ToLower()
        $ctype = $mime[$ext]; if (-not $ctype) { $ctype = "application/octet-stream" }
        $bytes = [System.IO.File]::ReadAllBytes($file)
        $res.ContentType = $ctype
        $res.ContentLength64 = $bytes.Length
        $res.StatusCode = 200
        if ($req.HttpMethod -ne "HEAD") {
          $res.OutputStream.Write($bytes, 0, $bytes.Length)
        }
      } else {
        $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $path")
        $res.StatusCode = 404
        $res.ContentLength64 = $msg.Length
        if ($req.HttpMethod -ne "HEAD") {
          $res.OutputStream.Write($msg, 0, $msg.Length)
        }
      }
    } catch {
      Write-Host "Request error: $_"
    } finally {
      try { $ctx.Response.OutputStream.Close(); $ctx.Response.Close() } catch {}
    }
  }
} finally {
  $listener.Stop()
}
