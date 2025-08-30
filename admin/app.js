// Admin Panel JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const sidebar = document.querySelector('.sidebar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const pages = document.querySelectorAll('.page');
    const pageTitle = document.getElementById('page-title');
    const contentArea = document.getElementById('content-area');
    const logoutBtn = document.getElementById('logout-btn');
    const addContentBtn = document.getElementById('add-content-btn');
    const addUserBtn = document.getElementById('add-user-btn');
    const contentModal = document.getElementById('content-modal');
    const modalTitle = document.getElementById('modal-title');
    const contentForm = document.getElementById('content-form');
    const closeBtn = document.querySelector('.close');
    const cancelBtn = document.querySelector('.cancel-btn');
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');
    const notificationClose = document.querySelector('.notification-close');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Initialize Charts
    const performanceCtx = document.getElementById('performanceChart').getContext('2d');
    const trafficCtx = document.getElementById('trafficChart').getContext('2d');
    const contentCtx = document.getElementById('contentChart').getContext('2d');
    const demographicsCtx = document.getElementById('demographicsChart').getContext('2d');
    
    // Create Performance Chart
    new Chart(performanceCtx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Page Load Time (ms)',
                data: [1200, 1100, 1000, 900, 800, 850, 900],
                backgroundColor: 'rgba(78, 115, 223, 0.2)',
                borderColor: 'rgba(78, 115, 223, 1)',
                borderWidth: 2,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Create Traffic Chart
    new Chart(trafficCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Visitors',
                data: [4500, 5200, 4800, 6000, 7500, 8200],
                backgroundColor: 'rgba(78, 115, 223, 0.8)',
                borderColor: 'rgba(78, 115, 223, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Create Content Performance Chart
    new Chart(contentCtx, {
        type: 'doughnut',
        data: {
            labels: ['Posts', 'Pages', 'Media'],
            datasets: [{
                data: [65, 25, 10],
                backgroundColor: [
                    'rgba(78, 115, 223, 0.8)',
                    'rgba(28, 200, 138, 0.8)',
                    'rgba(246, 194, 62, 0.8)'
                ],
                borderColor: [
                    'rgba(78, 115, 223, 1)',
                    'rgba(28, 200, 138, 1)',
                    'rgba(246, 194, 62, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
    
    // Create Demographics Chart
    new Chart(demographicsCtx, {
        type: 'pie',
        data: {
            labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
            datasets: [{
                data: [15, 35, 25, 15, 10],
                backgroundColor: [
                    'rgba(78, 115, 223, 0.8)',
                    'rgba(28, 200, 138, 0.8)',
                    'rgba(246, 194, 62, 0.8)',
                    'rgba(231, 74, 59, 0.8)',
                    'rgba(133, 135, 150, 0.8)'
                ],
                borderColor: [
                    'rgba(78, 115, 223, 1)',
                    'rgba(28, 200, 138, 1)',
                    'rgba(246, 194, 62, 1)',
                    'rgba(231, 74, 59, 1)',
                    'rgba(133, 135, 150, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
    
    // Navigation functionality
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and pages
            navLinks.forEach(l => l.classList.remove('active'));
            pages.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get the page name
            const pageName = this.getAttribute('data-page');
            
            // Update page title
            pageTitle.textContent = this.textContent.trim();
            
            // Show corresponding page
            const targetPage = document.getElementById(`${pageName}-page`);
            if (targetPage) {
                targetPage.classList.add('active');
            }
        });
    });
    
    // Logout functionality
    logoutBtn.addEventListener('click', function() {
        // In a real app, this would call a logout API
        showNotification('Logged out successfully');
        
        // Redirect to login page after a short delay
        setTimeout(() => {
            window.location.href = '/login';
        }, 1500);
    });
    
    // Add content button
    addContentBtn.addEventListener('click', function() {
        modalTitle.textContent = 'Add New Content';
        contentForm.reset();
        contentModal.style.display = 'flex';
    });
    
    // Add user button
    addUserBtn.addEventListener('click', function() {
        showNotification('Add User functionality would open a modal here');
    });
    
    // Close modal
    closeBtn.addEventListener('click', function() {
        contentModal.style.display = 'none';
    });
    
    cancelBtn.addEventListener('click', function() {
        contentModal.style.display = 'none';
    });
    
    // Submit content form
    contentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const title = document.getElementById('content-title').value;
        const type = document.getElementById('content-type').value;
        const body = document.getElementById('content-body').value;
        const status = document.getElementById('content-status').value;
        
        // In a real app, this would send data to an API
        console.log({ title, type, body, status });
        
        // Show success notification
        showNotification(`${type} "${title}" saved successfully`);
        
        // Close modal
        contentModal.style.display = 'none';
        
        // In a real app, we would refresh the content list
        // For demo, we'll just log it
        console.log('Content list would be refreshed here');
    });
    
    // Tab functionality in settings
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all tabs and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get the tab name
            const tabName = this.getAttribute('data-tab');
            
            // Show corresponding tab content
            const targetTab = document.getElementById(`${tabName}-tab`);
            if (targetTab) {
                targetTab.classList.add('active');
            }
        });
    });
    
    // Notification functionality
    function showNotification(message) {
        notificationMessage.textContent = message;
        notification.classList.add('show');
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
    
    // Close notification when close button is clicked
    notificationClose.addEventListener('click', function() {
        notification.classList.remove('show');
    });
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(e) {
        if (e.target === contentModal) {
            contentModal.style.display = 'none';
        }
    });
    
    // Mobile menu toggle
    const menuToggle = document.createElement('button');
    menuToggle.classList.add('menu-toggle');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.header').prepend(menuToggle);
    
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
    
    // Check if user is authenticated (in a real app, this would be a proper auth check)
    const isAuthenticated = true; // Change to false to test login redirect
    
    if (!isAuthenticated) {
        // Redirect to login page
        window.location.href = '/login';
    }
});