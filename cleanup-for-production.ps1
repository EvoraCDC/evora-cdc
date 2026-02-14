# Production Cleanup Script for Evora CDC Website
# This script removes all development files and keeps only production-ready files

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Evora CDC - Production Cleanup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Define files to remove
$filesToRemove = @(
    # PowerShell scripts (development only)
    "add-counseling.ps1",
    "add-nav-top-bar.ps1",
    "add-seo-tags.ps1",
    "cleanup-programs.ps1",
    "download_images.ps1",
    "fix-all-navigation.ps1",
    "fix-dark-theme.ps1",
    "fix-formatting.ps1",
    "refine-counseling.ps1",
    "remove-services-dropdown.ps1",
    "update-contact-details.ps1",
    "update-content-links.ps1",
    "update-email.ps1",
    "update-locations.ps1",
    "update-pages.ps1",
    "update-programs-page.ps1",
    "update-services.ps1",
    "update-testimonials.ps1",
    
    # Python scripts
    "fix_encoding.py",
    
    # Documentation files (optional - comment out if you want to keep)
    "COLOR_SCHEME.md",
    "IMAGE_PROMPTS.md",
    "README.md",
    
    # Other unused files
    "colors (2).svg"
)

# Count files
$totalFiles = $filesToRemove.Count
$removedCount = 0
$notFoundCount = 0

Write-Host "Starting cleanup process..." -ForegroundColor Yellow
Write-Host "Files to process: $totalFiles" -ForegroundColor Yellow
Write-Host ""

# Remove each file
foreach ($file in $filesToRemove) {
    $filePath = Join-Path -Path $PSScriptRoot -ChildPath $file
    
    if (Test-Path $filePath) {
        try {
            Remove-Item -Path $filePath -Force
            Write-Host "[DELETED] $file" -ForegroundColor Green
            $removedCount++
        }
        catch {
            Write-Host "[ERROR] Failed to delete $file : $_" -ForegroundColor Red
        }
    }
    else {
        Write-Host "[SKIP] $file (not found)" -ForegroundColor Gray
        $notFoundCount++
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Cleanup Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Total files processed: $totalFiles" -ForegroundColor White
Write-Host "Successfully removed: $removedCount" -ForegroundColor Green
Write-Host "Not found (already removed): $notFoundCount" -ForegroundColor Gray
Write-Host ""

# Optional: Remove .git folder
Write-Host "Do you want to remove the .git folder? (Y/N)" -ForegroundColor Yellow
$response = Read-Host
if ($response -eq 'Y' -or $response -eq 'y') {
    $gitPath = Join-Path -Path $PSScriptRoot -ChildPath ".git"
    if (Test-Path $gitPath) {
        Remove-Item -Path $gitPath -Recurse -Force
        Write-Host "[DELETED] .git folder" -ForegroundColor Green
    }
    else {
        Write-Host "[SKIP] .git folder not found" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Production files ready for deployment!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Remaining production files:" -ForegroundColor Yellow
Write-Host "  - HTML pages (index.html, about.html, etc.)" -ForegroundColor White
Write-Host "  - robots.txt" -ForegroundColor White
Write-Host "  - sitemap.xml" -ForegroundColor White
Write-Host "  - assets/ folder (images)" -ForegroundColor White
Write-Host "  - css/ folder (stylesheets)" -ForegroundColor White
Write-Host "  - js/ folder (JavaScript)" -ForegroundColor White
Write-Host ""
Write-Host "Your website is now ready for production deployment! 🚀" -ForegroundColor Green
