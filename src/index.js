import Emitter from './Emitter.js';

const explodeJS = { Emitter };

// Expose explodeJS object to global scope
if (typeof window !== 'undefined') {
    window.explodeJS = explodeJS;
}