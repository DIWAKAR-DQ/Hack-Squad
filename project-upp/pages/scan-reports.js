document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const browseBtn = document.getElementById('browseBtn');
    const fileUpload = document.getElementById('fileUpload');
    const uploadCard = document.querySelector('.upload-card');
    const uploadModal = document.getElementById('uploadModal');
    const closeModal = document.getElementById('closeModal');
    const cancelUploadBtn = document.getElementById('cancelUploadBtn');
    const uploadProgress = document.getElementById('uploadProgress');
    const progressText = document.getElementById('progressText');
    const uploadQueue = document.getElementById('uploadQueue');
    const searchInput = document.getElementById('searchInput');
    const filterType = document.getElementById('filterType');
    const filterDate = document.getElementById('filterDate');
    const reportsGrid = document.getElementById('reportsGrid');
    const reportModal = document.getElementById('reportModal');
    const modalReportTitle = document.getElementById('modalReportTitle');
    const reportPreview = document.getElementById('reportPreview');
    const reportDate = document.getElementById('reportDate');
    const reportType = document.getElementById('reportType');
    const reportDoctor = document.getElementById('reportDoctor');
    const reportFacility = document.getElementById('reportFacility');
    const reportNotes = document.getElementById('reportNotes');
    const downloadBtn = document.getElementById('downloadBtn');
    const shareBtn = document.getElementById('shareBtn');
    const deleteBtn = document.getElementById('deleteBtn');

    // Sample data for demonstration
    let reports = [
        {
            id: '1',
            title: 'Chest X-Ray Report',
            type: 'xray',
            date: '2023-05-15',
            doctor: 'Dr. Rajesh Kumar',
            facility: 'Apollo Hospitals, Chennai',
            notes: 'Mild opacity observed in the right lung. Follow-up recommended in 2 weeks.',
            fileType: 'pdf',
            fileName: 'chest_xray_report.pdf',
            fileSize: '2.4',
            status: 'uploaded'
        },
        {
            id: '2',
            title: 'Blood Test Results',
            type: 'blood',
            date: '2023-06-02',
            doctor: 'Dr. Priya Menon',
            facility: 'Fortis Malar Hospital',
            notes: 'Slightly elevated cholesterol levels. Recommended to reduce saturated fat intake.',
            fileType: 'pdf',
            fileName: 'blood_test_results.pdf',
            fileSize: '1.8',
            status: 'uploaded'
        },
        {
            id: '3',
            title: 'MRI Scan - Brain',
            type: 'mri',
            date: '2023-04-10',
            doctor: 'Dr. Arvind Swamy',
            facility: 'MIOT International',
            notes: 'No abnormalities detected. All structures appear normal.',
            fileType: 'jpg',
            fileName: 'mri_brain_scan.jpg',
            fileSize: '3.5',
            status: 'uploaded'
        },
        {
            id: '4',
            title: 'Ultrasound Report',
            type: 'ultrasound',
            date: '2023-03-22',
            doctor: 'Dr. Meera Krishnan',
            facility: 'Global Hospitals',
            notes: 'Normal study. No significant findings.',
            fileType: 'pdf',
            fileName: 'ultrasound_report.pdf',
            fileSize: '1.2',
            status: 'uploaded'
        },
        {
            id: '5',
            title: 'CT Scan - Abdomen',
            type: 'ct',
            date: '2023-02-15',
            doctor: 'Dr. Sanjay Gupta',
            facility: 'Apollo Speciality Hospital',
            notes: 'Mild fatty liver. No other abnormalities detected.',
            fileType: 'jpg',
            fileName: 'ct_abdomen_scan.jpg',
            fileSize: '4.2',
            status: 'uploaded'
        }
    ];

    // Initialize the page
    function init() {
        // Load reports from localStorage if available
        const savedReports = localStorage.getItem('medicalReports');
        if (savedReports) {
            reports = JSON.parse(savedReports);
        } else {
            // Save initial reports to localStorage
            saveReportsToStorage();
        }

        // Render reports
        renderReports(reports);

        // Set up event listeners
        setupEventListeners();
    }

    // Set up event listeners
    function setupEventListeners() {
        // Browse button click
        browseBtn.addEventListener('click', () => fileUpload.click());
        
        // File input change
        fileUpload.addEventListener('change', handleFileSelect);
        
        // Drag and drop
        uploadCard.addEventListener('dragover', handleDragOver);
        uploadCard.addEventListener('dragleave', handleDragLeave);
        uploadCard.addEventListener('drop', handleDrop);
        
        // Close modal buttons
        closeModal.addEventListener('click', () => {
            reportModal.classList.remove('show');
        });
        
        cancelUploadBtn.addEventListener('click', () => {
            uploadModal.classList.remove('show');
            // In a real app, you would cancel any ongoing uploads
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === reportModal) {
                reportModal.classList.remove('show');
            }
            if (e.target === uploadModal) {
                uploadModal.classList.remove('show');
            }
        });
        
        // Search and filter
        searchInput.addEventListener('input', filterReports);
        filterType.addEventListener('change', filterReports);
        filterDate.addEventListener('change', filterReports);
        
        // Action buttons
        downloadBtn.addEventListener('click', downloadReport);
        shareBtn.addEventListener('click', shareReport);
        deleteBtn.addEventListener('click', deleteReport);
    }

    // Handle file selection
    function handleFileSelect(e) {
        const files = e.target.files;
        if (files.length > 0) {
            processFiles(files);
        }
    }

    // Handle drag over
    function handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        uploadCard.classList.add('drag-over');
    }

    // Handle drag leave
    function handleDragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
        uploadCard.classList.remove('drag-over');
    }

    // Handle drop
    function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        uploadCard.classList.remove('drag-over');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            processFiles(files);
        }
    }

    // Process selected files
    function processFiles(files) {
        // Clear previous uploads
        uploadQueue.innerHTML = '';
        
        // Show upload modal
        uploadModal.classList.add('show');
        
        // Reset progress
        updateProgress(0);
        
        // Process each file
        const validFiles = Array.from(files).filter(file => {
            const fileType = file.name.split('.').pop().toLowerCase();
            const isValidType = ['pdf', 'jpg', 'jpeg', 'png'].includes(fileType);
            const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
            
            if (!isValidType) {
                showNotification(`Unsupported file type: ${file.name}`, 'error');
                return false;
            }
            
            if (!isValidSize) {
                showNotification(`File too large (max 10MB): ${file.name}`, 'error');
                return false;
            }
            
            return true;
        });
        
        if (validFiles.length === 0) return;
        
        // Add files to upload queue
        validFiles.forEach((file, index) => {
            addFileToQueue(file, index);
        });
        
        // Simulate upload progress
        simulateUpload(validFiles);
    }

    // Add file to upload queue
    function addFileToQueue(file, index) {
        const fileType = file.name.split('.').pop().toLowerCase();
        const fileSize = (file.size / (1024 * 1024)).toFixed(1); // Convert to MB
        
        const fileItem = document.createElement('div');
        fileItem.className = 'upload-item';
        fileItem.dataset.index = index;
        
        fileItem.innerHTML = `
            <div class="upload-item-icon">
                <i class="fas fa-file-${getFileIcon(fileType)}"></i>
            </div>
            <div class="upload-item-details">
                <div class="upload-item-name" title="${file.name}">${file.name}</div>
                <div class="upload-item-progress">
                    <div class="upload-item-progress-bar" style="width: 0%"></div>
                </div>
                <div class="upload-item-status">Waiting to upload...</div>
            </div>
            <div class="upload-item-actions">
                <button class="upload-item-btn cancel" title="Remove">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        uploadQueue.appendChild(fileItem);
        
        // Add event listener for cancel button
        const cancelBtn = fileItem.querySelector('.cancel');
        cancelBtn.addEventListener('click', () => {
            fileItem.remove();
            // In a real app, you would cancel the specific upload
        });
    }

    // Simulate file upload (in a real app, this would be an actual file upload)
    function simulateUpload(files) {
        let uploadedCount = 0;
        const totalFiles = files.length;
        
        files.forEach((file, index) => {
            const fileItem = document.querySelector(`.upload-item[data-index="${index}"]`);
            const progressBar = fileItem.querySelector('.upload-item-progress-bar');
            const statusText = fileItem.querySelector('.upload-item-status');
            
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    
                    // Update status
                    statusText.textContent = 'Uploaded';
                    statusText.style.color = '#10b981';
                    
                    // Add to reports after a short delay
                    setTimeout(() => {
                        addReportToCollection(file);
                        uploadedCount++;
                        
                        // Update overall progress
                        const overallProgress = Math.round((uploadedCount / totalFiles) * 100);
                        updateProgress(overallProgress);
                        
                        // Close modal if all files are uploaded
                        if (uploadedCount === totalFiles) {
                            setTimeout(() => {
                                uploadModal.classList.remove('show');
                                showNotification(`${uploadedCount} file(s) uploaded successfully`, 'success');
                                renderReports(reports);
                            }, 1000);
                        }
                    }, 500);
                }
                
                // Update progress bar
                progressBar.style.width = `${progress}%`;
                statusText.textContent = `Uploading... ${Math.round(progress)}%`;
                
            }, 200 + Math.random() * 300);
        });
    }

    // Update overall upload progress
    function updateProgress(percent) {
        uploadProgress.style.width = `${percent}%`;
        progressText.textContent = `${percent}%`;
    }

    // Add uploaded file to reports collection
    function addReportToCollection(file) {
        const fileType = file.name.split('.').pop().toLowerCase();
        const fileSize = (file.size / (1024 * 1024)).toFixed(1); // Convert to MB
        
        // Generate a unique ID
        const id = Date.now().toString();
        
        // Create a new report object
        const newReport = {
            id: id,
            title: file.name.replace(/\.[^/.]+$/, ''), // Remove file extension
            type: getReportTypeFromFileName(file.name),
            date: new Date().toISOString().split('T')[0],
            doctor: 'Not specified',
            facility: 'Self-uploaded',
            notes: 'No additional notes provided.',
            fileType: fileType,
            fileName: file.name,
            fileSize: fileSize,
            status: 'uploaded'
        };
        
        // Add to reports array
        reports.unshift(newReport);
        
        // Save to localStorage
        saveReportsToStorage();
    }

    // Get report type from file name or extension
    function getReportTypeFromFileName(fileName) {
        const lowerName = fileName.toLowerCase();
        
        if (lowerName.includes('xray') || lowerName.includes('x-ray')) return 'xray';
        if (lowerName.includes('mri')) return 'mri';
        if (lowerName.includes('ct') || lowerName.includes('scan')) return 'ct';
        if (lowerName.includes('ultrasound') || lowerName.includes('usg')) return 'ultrasound';
        if (lowerName.includes('blood') || lowerName.includes('lab')) return 'blood';
        
        return 'other';
    }

    // Get file icon based on file type
    function getFileIcon(fileType) {
        switch (fileType) {
            case 'pdf':
                return 'pdf';
            case 'jpg':
            case 'jpeg':
            case 'png':
                return 'image';
            default:
                return 'file';
        }
    }

    // Render reports in the grid
    function renderReports(reportsToRender) {
        if (reportsToRender.length === 0) {
            reportsGrid.innerHTML = `
                <div class="no-reports">
                    <i class="fas fa-folder-open"></i>
                    <p>No reports found matching your criteria.</p>
                </div>
            `;
            return;
        }
        
        reportsGrid.innerHTML = '';
        
        reportsToRender.forEach(report => {
            const reportCard = document.createElement('div');
            reportCard.className = 'report-card';
            reportCard.dataset.id = report.id;
            
            // Format date for display
            const formattedDate = formatDate(report.date);
            
            // Get report type display name
            const typeDisplayNames = {
                'xray': 'X-Ray',
                'mri': 'MRI',
                'ct': 'CT Scan',
                'ultrasound': 'Ultrasound',
                'blood': 'Blood Test',
                'other': 'Report'
            };
            
            const typeDisplayName = typeDisplayNames[report.type] || 'Report';
            
            reportCard.innerHTML = `
                <div class="report-preview-img">
                    ${report.fileType === 'pdf' ? 
                        `<i class="fas fa-file-pdf file-icon"></i>` : 
                        `<img src="https://via.placeholder.com/300x200/1e40af/ffffff?text=${encodeURIComponent(typeDisplayName)}" alt="${report.title}">`
                    }
                    <span class="report-type-badge">${typeDisplayName}</span>
                </div>
                <div class="report-details">
                    <h3 class="report-title" title="${report.title}">${report.title}</h3>
                    <div class="report-meta">
                        <span>${formattedDate}</span>
                        <span>${report.fileSize} MB</span>
                    </div>
                    <div class="report-actions">
                        <button class="action-btn view" data-action="view" title="View Report">
                            <i class="fas fa-eye"></i> View
                        </button>
                        <button class="action-btn" data-action="download" title="Download">
                            <i class="fas fa-download"></i>
                        </button>
                    </div>
                </div>
            `;
            
            // Add event listeners to action buttons
            const viewBtn = reportCard.querySelector('[data-action="view"]');
            const downloadBtn = reportCard.querySelector('[data-action="download"]');
            
            viewBtn.addEventListener('click', () => viewReport(report.id));
            downloadBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                downloadReport(report.id);
            });
            
            // Make the whole card clickable
            reportCard.addEventListener('click', () => viewReport(report.id));
            
            reportsGrid.appendChild(reportCard);
        });
    }

    // View report details
    function viewReport(reportId) {
        const report = reports.find(r => r.id === reportId);
        if (!report) return;
        
        // Update modal content
        modalReportTitle.textContent = report.title;
        reportDate.textContent = formatDate(report.date, true);
        
        // Get report type display name
        const typeDisplayNames = {
            'xray': 'X-Ray',
            'mri': 'MRI',
            'ct': 'CT Scan',
            'ultrasound': 'Ultrasound',
            'blood': 'Blood Test',
            'other': 'Other'
        };
        
        reportType.textContent = typeDisplayNames[report.type] || 'Other';
        reportDoctor.textContent = report.doctor || 'Not specified';
        reportFacility.textContent = report.facility || 'Not specified';
        reportNotes.textContent = report.notes || 'No additional notes available.';
        
        // Set up preview content
        if (report.fileType === 'pdf') {
            reportPreview.innerHTML = `
                <div class="file-preview">
                    <i class="fas fa-file-pdf"></i>
                    <p>PDF documents can be viewed after downloading</p>
                    <button class="btn primary-btn" id="openPdfBtn">
                        <i class="fas fa-external-link-alt"></i> Open PDF
                    </button>
                </div>
            `;
            
            // Add event listener for the open PDF button
            const openPdfBtn = document.getElementById('openPdfBtn');
            if (openPdfBtn) {
                openPdfBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    downloadReport(reportId);
                });
            }
        } else {
            // For images, show a preview
            reportPreview.innerHTML = `
                <img src="https://via.placeholder.com/600x800/1e40af/ffffff?text=${encodeURIComponent(report.title)}" alt="${report.title}">
            `;
        }
        
        // Set data attributes for action buttons
        downloadBtn.dataset.id = reportId;
        shareBtn.dataset.id = reportId;
        deleteBtn.dataset.id = reportId;
        
        // Show the modal
        reportModal.classList.add('show');
    }

    // Download report
    function downloadReport(reportId) {
        if (typeof reportId === 'string') {
            // Called from action button
            const report = reports.find(r => r.id === reportId);
            if (!report) return;
            
            // In a real app, this would trigger a download of the actual file
            showNotification(`Downloading ${report.fileName}...`, 'info');
            
            // Simulate download
            setTimeout(() => {
                showNotification(`${report.fileName} downloaded successfully`, 'success');
            }, 1000);
        } else {
            // Called from modal download button
            const reportId = downloadBtn.dataset.id;
            const report = reports.find(r => r.id === reportId);
            if (!report) return;
            
            // In a real app, this would trigger a download of the actual file
            showNotification(`Downloading ${report.fileName}...`, 'info');
            
            // Close modal after a short delay
            setTimeout(() => {
                reportModal.classList.remove('show');
                showNotification(`${report.fileName} downloaded successfully`, 'success');
            }, 1000);
        }
    }

    // Share report
    function shareReport() {
        const reportId = shareBtn.dataset.id;
        const report = reports.find(r => r.id === reportId);
        if (!report) return;
        
        // In a real app, this would open a share dialog or copy a shareable link
        showNotification(`Sharing options for ${report.fileName}`, 'info');
        
        // Example of using Web Share API if available
        if (navigator.share) {
            navigator.share({
                title: report.title,
                text: `Check out my ${report.title} from ${report.facility}`,
                url: window.location.href // In a real app, this would be a shareable link
            }).catch(error => {
                console.log('Error sharing:', error);
            });
        }
    }

    // Delete report
    function deleteReport() {
        const reportId = deleteBtn.dataset.id;
        const reportIndex = reports.findIndex(r => r.id === reportId);
        
        if (reportIndex === -1) return;
        
        if (confirm('Are you sure you want to delete this report? This action cannot be undone.')) {
            // Remove from array
            reports.splice(reportIndex, 1);
            
            // Save to localStorage
            saveReportsToStorage();
            
            // Close modal
            reportModal.classList.remove('show');
            
            // Refresh the view
            filterReports();
            
            showNotification('Report deleted successfully', 'success');
        }
    }

    // Filter reports based on search and filters
    function filterReports() {
        const searchTerm = searchInput.value.toLowerCase();
        const typeFilter = filterType.value;
        const dateFilter = filterDate.value;
        
        let filteredReports = [...reports];
        
        // Apply search filter
        if (searchTerm) {
            filteredReports = filteredReports.filter(report => 
                report.title.toLowerCase().includes(searchTerm) ||
                (report.notes && report.notes.toLowerCase().includes(searchTerm)) ||
                (report.doctor && report.doctor.toLowerCase().includes(searchTerm)) ||
                (report.facility && report.facility.toLowerCase().includes(searchTerm))
            );
        }
        
        // Apply type filter
        if (typeFilter !== 'all') {
            filteredReports = filteredReports.filter(report => report.type === typeFilter);
        }
        
        // Apply date filter
        if (dateFilter === 'recent') {
            filteredReports.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else {
            filteredReports.sort((a, b) => new Date(a.date) - new Date(b.date));
        }
        
        // Render filtered reports
        renderReports(filteredReports);
    }

    // Format date for display
    function formatDate(dateString, fullDate = false) {
        const options = fullDate ? 
            { year: 'numeric', month: 'long', day: 'numeric' } : 
            { year: 'numeric', month: 'short', day: 'numeric' };
            
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    // Save reports to localStorage
    function saveReportsToStorage() {
        localStorage.setItem('medicalReports', JSON.stringify(reports));
    }

    // Show notification
    function showNotification(message, type = 'info') {
        // In a real app, you would show a proper notification
        console.log(`[${type.toUpperCase()}] ${message}`);
    }

    // Initialize the page
    init();
});
