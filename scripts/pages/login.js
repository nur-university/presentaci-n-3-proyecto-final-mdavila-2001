document.addEventListener('DOMContentLoaded', () => {
    initializeStars();
    initializePasswordToggle();
    initializeFormValidation();
});

function initializeStars() {
    const stars = document.querySelectorAll('.star');
    
    const randomRange = (min, max) => {
        return Math.random() * (max - min) + min;
    };
    
    stars.forEach(star => {
        const tailLength = randomRange(5, 7.5).toFixed(2);
        const topOffset = randomRange(-20, 100).toFixed(2);
        const leftOffset = randomRange(0, 100).toFixed(2);
        const fallDuration = randomRange(6, 12).toFixed(2);
        const fallDelay = randomRange(0, 10).toFixed(2);
        
        star.style.setProperty('--star-tail-length', `${tailLength}em`);
        star.style.setProperty('--top-offset', `${topOffset}vh`);
        star.style.setProperty('--left-offset', `${leftOffset}vw`);
        star.style.setProperty('--fall-duration', `${fallDuration}s`);
        star.style.setProperty('--fall-delay', `${fallDelay}s`);
        star.style.setProperty('--tail-fade-duration', `${fallDuration}s`);
    });
}

function initializePasswordToggle() {
    const toggleButtons = document.querySelectorAll('[data-toggle="password"]');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const wrapper = button.closest('.password-wrapper');
            const input = wrapper.querySelector('.password-input');
            const icon = button.querySelector('.material-symbols-outlined');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.textContent = 'visibility_off';
                button.setAttribute('aria-label', 'Ocultar contraseña');
            } else {
                input.type = 'password';
                icon.textContent = 'visibility';
                button.setAttribute('aria-label', 'Mostrar contraseña');
            }
        });
    });
}

function initializeFormValidation() {
    const form = document.querySelector('.login-form');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        
        if (!email || !password) {
            showNotification('Por favor, completa todos los campos', 'error');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Por favor, ingresa un correo electrónico válido', 'error');
            return;
        }
        
        if (password.length < 6) {
            showNotification('La contraseña debe tener al menos 6 caracteres', 'error');
            return;
        }
        
        showNotification('Iniciando sesión...', 'success');
        
        setTimeout(() => {
            console.log('Login attempt:', { email, password: '***' });
        }, 1500);
    });
}

function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '16px 24px',
        color: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        zIndex: '9999',
        fontSize: '14px',
        fontFamily: 'var(--font-base)',
        fontWeight: '500',
        maxWidth: '320px',
        animation: 'slideIn 0.3s ease-out',
        pointerEvents: 'auto'
    });
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
