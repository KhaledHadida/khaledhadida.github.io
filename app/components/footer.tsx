export default function footer() {

    return (
        <div id="footer" className="relative z-20">
                <svg viewBox="0 600 800 200" xmlns="http://www.w3.org/2000/svg">
                    <clipPath id="Earth">
                        <circle cx="400" cy="810" r="150" />
                    </clipPath>

                    <rect
                        clipPath="url(#Earth)" x="0" y="650"
                        width="800" height="200"
                        fill="#1FC7FF" stroke="#B30077" strokeWidth="11"></rect>

                    <path
                        clipPath="url(#Earth)"
                        fill="green"
                        d="M 247 701 C 257 692 267 683 289 675 C 304 681 303 675 318 669 C 375 673 313 672 338 706 C 357.3333 713 362 711 369 693 C 393 699 396.6667 715 397 717 Q 395 724 367 737 L 356 761 C 349 774 342 823 337 780 C 333 792 310 783 303 836 C 234 804 285 784.6667 250 774 c -11 -52 23 -45 -25 -60 Z"
                    />
                    
                    <path
                        clipPath="url(#Earth)"
                        fill="green"
                        d="M 463 689 C 460 671 505 675 520 670 C 530 675 540 665 550 675 C 560 685 570 680 585 680 Q 600 680 610 695 C 620 710 625 720 620 730 Q 615 740 600 750 L 580 760 C 570 765 555 770 540 760 C 525 750 510 740 500 730 Q 488 717 471 711 Z"
                    />
                </svg>

        </div>
    );
}