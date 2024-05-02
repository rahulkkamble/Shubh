

let swiperAnimation = () =>{
    console.log('started animation on swiper');
    var swiperWraper = document.querySelector('.swiper-container .swiper-wrapper');

    // Get the initial transform value
    var initialTransform = getComputedStyle(swiperWraper).transform;

    // Store the initial transform value
    swiperWraper.dataset.initialTransform = initialTransform;

    // Parse the initial transform value to extract the current translateX value
    var initialTransformMatrix = new DOMMatrixReadOnly(initialTransform);
    var currentTranslateX = initialTransformMatrix.m41;

    // Calculate the new translateX value by adding 20px to the current translateX value
    var newX = currentTranslateX - 120; // Move 20px from the current position on X-axis

    // Apply the transform
    swiperWraper.style.transition = `transform 1000ms cubic-bezier(0, 1.22, 0.52, 0.89) 0s`;
    swiperWraper.style.transform = `translate3d(${newX}px, 0, 0)`;

    // Reset the transform to the initial position after 2 seconds
    timeoutForInitial = setTimeout(() => {
        clearTimeout(timeoutForInitial)
        swiperWraper.style.transition = `transform 800ms cubic-bezier(0.91,-0.02, 0.36, 0.9) 0s`;
        swiperWraper.style.transform = swiperWraper.dataset.initialTransform;
    }, 1000);
}

// Set interval for subsequent animations until user interaction
animationInterval = setInterval(swiperAnimation, 7000);

// Stop the animation interval when the user interacts with the swiper
var swiperContainer = document.querySelector('.swiper-container');

swiperContainer.addEventListener('click', ()=>{
    clearInterval(animationInterval);
    clearTimeout(timeoutForInitial);
})

// ________________________________________________________________________________________________
$(document).ready(function() {
    // Initialize the Appear plugin
    console.log('ready')
    $('.counter-text-wrap').appear(function() {
        console.log('initialized appear plugin');
        console.log(this);
        // Check if the element has already been counted
        if (!$(this).hasClass('counted')) {
            // Add the 'counted' class to prevent re-counting
            $(this).addClass('counted');
            
            // Get the data attributes for counting animation
            var $countText = $(this).find('.count-text');
            var countStop = parseInt($countText.attr('data-stop'));
            var countSpeed = parseInt($countText.attr('data-speed'));
            
            // Animate the counting effect
            $({ countNum: $countText.text() }).animate({ countNum: countStop }, {
                duration: countSpeed,
                easing: 'linear',
                step: function() {
                    $countText.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $countText.text(this.countNum);
                }
            });
        }
    }, { accY: -50 }); // Adjust the threshold as needed
});

