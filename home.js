// ============================================
// VARIABLES Y ELEMENTOS
// ============================================

const sidebar = document.querySelector('.sidebar');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const notificationBtn = document.querySelector('.notification-btn');
const profileBtn = document.querySelector('.profile-btn');

// ============================================
// NAVEGACIÓN ACTIVA
// ============================================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        navLinks.forEach(l => l.classList.remove('active'));
        e.currentTarget.classList.add('active');
    });
});

if (navLinks.length > 0) {
    navLinks[0].classList.add('active');
}

// ============================================
// TEMA OSCURO/CLARO
// ============================================

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const storedTheme = localStorage.getItem('theme');
const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
applyTheme(initialTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
});

function applyTheme(theme) {
    if (theme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        document.documentElement.style.setProperty('--bg-light', '#1A1A2E');
        document.documentElement.style.setProperty('--bg-white', '#0B1B4D');
        document.documentElement.style.setProperty('--text-dark', '#F5F7FB');
        document.documentElement.style.setProperty('--text-muted', '#B0B8C9');
    } else {
        body.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        document.documentElement.style.setProperty('--bg-light', '#F5F7FB');
        document.documentElement.style.setProperty('--bg-white', '#FFFFFF');
        document.documentElement.style.setProperty('--text-dark', '#1A1A2E');
        document.documentElement.style.setProperty('--text-muted', '#6B7280');
    }
}

// ============================================
// INTERACTIVIDAD DE TARJETAS
// ============================================

const statCards = document.querySelectorAll('.stat-card');

statCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-6px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ============================================
// NOTIFICACIONES
// ============================================

if (notificationBtn) {
    notificationBtn.addEventListener('click', () => {
        const badge = notificationBtn.querySelector('.badge');
        if (badge) {
            badge.textContent = '0';
            badge.style.display = 'none';
        }
        showToast('Todas las notificaciones han sido leídas', 'info');
    });
}

// ============================================
// PERFIL
// ============================================

if (profileBtn) {
    profileBtn.addEventListener('click', () => {
        showToast('Abriendo perfil del usuario', 'info');
    });
}

// ============================================
// BÚSQUEDA
// ============================================

const searchInput = document.querySelector('.search-input');

if (searchInput) {
    searchInput.addEventListener('focus', function() {
        this.parentElement.style.boxShadow = '0 0 0 3px rgba(109, 93, 246, 0.1)';
    });

    searchInput.addEventListener('blur', function() {
        this.parentElement.style.boxShadow = 'none';
    });

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length > 0) {
            console.log('Búsqueda:', query);
        }
    });
}

// ============================================
// FUNCIÓN TOAST (NOTIFICACIONES)
// ============================================

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: ${type === 'success' ? '#10B981' : '#3B82F6'};
        color: white;
        padding: 12px 20px;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        animation: slideInUp 0.3s ease-out;
        z-index: 9999;
        max-width: 300px;
    `;
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideInDown 0.3s ease-in';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// ============================================
// ANIMACIONES GLOBALES
// ============================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            transform: translateY(100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    @keyframes slideInDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(100%);
            opacity: 0;
        }
    }

    .calendar-day.selected {
        background: linear-gradient(135deg, #6D5DF6, #8B5CF6);
        color: white;
        font-weight: 700;
        box-shadow: 0 4px 12px rgba(109, 93, 246, 0.3);
    }
`;
document.head.appendChild(style);

// ============================================
// EFECTO SCROLL
// ============================================

// ============================================
// EFECTO SCROLL
// ============================================

let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ============================================
// EVENTOS DEL HORARIO
// ============================================

const scheduleEvents = document.querySelectorAll('.event');

scheduleEvents.forEach(event => {
    event.addEventListener('click', function() {
        const title = this.querySelector('.event-title').textContent;
        const time = this.querySelector('.event-time').textContent;
        showToast(`${title} - ${time}`, 'info');
    });
});

// ============================================
// CALENDARIO
// ============================================

const monthNavs = document.querySelectorAll('.month-nav');
const monthName = document.querySelector('.month-name');
const calendarDays = document.querySelectorAll('.calendar-day:not(.empty)');

const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

let currentMonth = 4; // Mayo (0-indexed)

monthNavs.forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.classList.contains('prev')) {
            currentMonth = (currentMonth - 1 + 12) % 12;
        } else {
            currentMonth = (currentMonth + 1) % 12;
        }
        monthName.textContent = months[currentMonth] + ' 2024';
    });
});

calendarDays.forEach(day => {
    day.addEventListener('click', function() {
        if (this.classList.contains('empty')) return;
        
        document.querySelectorAll('.calendar-day.selected').forEach(d => {
            d.classList.remove('selected');
        });
        this.classList.add('selected');
        const dayNum = this.textContent;
        showToast(`Seleccionado: ${dayNum} de ${monthName.textContent}`, 'info');
    });
});

// ============================================
// ACTIVIDADES
// ============================================

const activityItems = document.querySelectorAll('.activity-item');

activityItems.forEach(item => {
    item.addEventListener('click', function() {
        const title = this.querySelector('.activity-title').textContent;
        showToast(`Actividad: ${title}`, 'info');
    });
});

// ============================================
// CALIFICACIONES
// ============================================

const gradeItems = document.querySelectorAll('.grade-item');

gradeItems.forEach(item => {
    item.addEventListener('click', function() {
        const name = this.querySelector('.grade-name').textContent;
        const value = this.querySelector('.grade-value').textContent;
        showToast(`${name}: ${value}`, 'info');
    });
});

// ============================================
// ACCESOS RÁPIDOS
// ============================================

const quickAccessItems = document.querySelectorAll('.quick-access-item');

quickAccessItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const text = this.querySelector('span').textContent;
        showToast(`Accediendo a: ${text}`, 'info');
    });
});

// ============================================
// CONSOLE LOG
// ============================================

console.log('%c🎓 Universidad del Futuro - Portal Académico', 'font-size: 20px; font-weight: bold; color: #6D5DF6;');
console.log('%cBienvenido al nuevo portal moderno', 'font-size: 14px; color: #0B1B4D;');
