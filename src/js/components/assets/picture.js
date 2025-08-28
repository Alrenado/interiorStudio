export default function initPicture(selector = ".select") {
    const selects = document.querySelectorAll(selector);

    selects.forEach(select => {
        const imageObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.dataset.hasOwnProperty('srcset') && entry.target.dataset.srcset !== undefined) {
                        entry.target.srcset = entry.target.dataset.srcset;
                    } else if (entry.target.dataset.hasOwnProperty('src') && entry.target.dataset.src !== undefined) {
                        entry.target.src = entry.target.dataset.src;
                    }

                    obs.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '200px'
        });

        document.querySelectorAll('.observed-picture img, .observed-picture source').forEach(el => imageObserver.observe(el));
    });
}
