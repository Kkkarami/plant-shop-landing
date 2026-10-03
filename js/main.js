"use strict";

document.addEventListener('DOMContentLoaded', () => {

    const burger = document.querySelector('#burgerMenu');
    const mobileNav = document.querySelector('#mobileNav');

    if (burger) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            mobileNav.classList.toggle('open');
        });

        mobileNav.querySelectorAll('.mobile-nav__link').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                mobileNav.classList.remove('open');
            });
        });

        document.addEventListener('click', (e) => {
            if (!burger.contains(e.target) && !mobileNav.contains(e.target)) {
                burger.classList.remove('active');
                mobileNav.classList.remove('open');
            }
        });
    }

    const modal = document.querySelector('#modalWindow');
    const closeModal = document.querySelector('.modal__close');
    const signInBtn = document.querySelector('.btn-signin');
    const visitShopBtn = document.querySelector('.shop-banner__button');

    const showModal = (title, message, type = 'info') => {
        const titleEl = document.querySelector('#modalTitle');
        const msgEl = document.querySelector('#modalMessage');
        const iconEl = document.querySelector('.modal__icon');

        titleEl.textContent = title;
        msgEl.textContent = message;

        modal.classList.remove('modal--info', 'modal--success', 'modal--warning', 'modal--error');
        modal.classList.add(`modal--${type}`);

        const icons = {
            info: 'ℹ️',
            success: '✅',
        };
        if (iconEl) iconEl.textContent = icons[type] || icons.info;

        modal.classList.add('active');
        document.body.classList.add('modal-open');
    };

    if (signInBtn) {
        signInBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showModal('Authorization', 'On the next page, you will need to enter your personal details', 'info');
        });
    }

    if (visitShopBtn) {
        visitShopBtn.addEventListener('click', () => {
            showModal('Welcome!', 'Redirecting you to our collection...', 'success');
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.classList.remove('modal-open');
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    });

    const themeToggle = document.querySelector('#themeToggle');
    const THEME_KEY = 'plantku-theme';

    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        if (themeToggle) {
            themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
            themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
        localStorage.setItem(THEME_KEY, theme);
    };

    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    applyTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            applyTheme(current === 'dark' ? 'light' : 'dark');
        });
    }

});