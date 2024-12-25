interface WatermarkProps {
	className?: string;
	size?: { width: number; height: number };
	color?: string;
}

const WordPressWordmark: React.FunctionComponent< WatermarkProps > = ( {
	className = 'wpcom-wordmark',
	size = { width: 150, height: 25 },
	color = '#fff',
} ) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={ size.width }
			height={ size.height }
			viewBox="-60 0 920 115"
			className={ className }
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M72.889 88.9077L86.673 49.2072C89.2441 42.7891 90.1012 37.6649 90.1012 33.1111C90.1012 31.4607 89.989 29.9224 89.7951 28.486C93.3151 34.8837 95.325 42.239 95.325 50.0528C95.325 66.638 86.3057 81.1143 72.889 88.9077ZM56.4114 28.975C59.1254 28.8323 61.5741 28.5471 61.5741 28.5471C64.0023 28.2618 63.7167 24.6962 61.2884 24.8389C61.2884 24.8389 53.9832 25.4094 49.2593 25.4094C44.821 25.4094 37.373 24.8389 37.373 24.8389C34.9345 24.6962 34.659 28.4045 37.0873 28.5471C37.0873 28.5471 39.3931 28.8323 41.8214 28.975L48.8512 48.1681L38.9748 77.671L22.5381 28.975C25.2622 28.8323 27.7007 28.5471 27.7007 28.5471C30.129 28.2618 29.8433 24.6962 27.415 24.8389C27.415 24.8389 20.1098 25.4094 15.3859 25.4094C14.539 25.4094 13.5392 25.389 12.4781 25.3584C20.5587 13.164 34.4243 5.10577 50.1979 5.10577C61.9516 5.10577 72.6441 9.57807 80.6738 16.913C80.4799 16.9028 80.2861 16.8723 80.0922 16.8723C75.654 16.8723 72.5115 20.7231 72.5115 24.8491C72.5115 28.5573 74.6541 31.6848 76.9497 35.3931C78.6638 38.3882 80.6738 42.2288 80.6738 47.7912C80.6738 51.642 79.5311 56.4811 77.2354 62.3287L72.736 77.3144L56.4216 28.9953L56.4114 28.975ZM50.1979 95.01C45.7699 95.01 41.4949 94.358 37.4444 93.1763L50.9835 53.9852L64.8594 91.8417C64.9512 92.0658 65.0634 92.2696 65.1859 92.4631C60.4926 94.1033 55.4524 95.01 50.1979 95.01ZM5.0606 50.0528C5.0606 43.5328 6.46859 37.349 8.96829 31.7561L30.4963 90.5072C15.4369 83.2231 5.0606 67.8503 5.0606 50.0528ZM50.1979 0.0629883C22.5176 0.0629883 0 22.4958 0 50.063C0 77.6302 22.5176 100.063 50.1979 100.063C77.8782 100.063 100.396 77.6302 100.396 50.063C100.396 22.4958 77.8782 0.0629883 50.1979 0.0629883Z"
				fill={ color }
			></path>
			<path
				d="M197.734 17.833L186.168 64.8452H185.608L173.236 17.833H161.857L149.509 64.8104H148.914L137.348 17.833H124.848L142.961 81.7599H154.434L167.307 36.8983H167.809L180.659 81.7599H192.132L210.234 17.833H197.734Z"
				fill={ color }
			></path>
			<path
				d="M243.555 36.2852C240.112 34.2275 236.039 33.1929 231.336 33.1929C226.632 33.1929 222.559 34.2275 219.116 36.2852C215.673 38.3428 213 41.2375 211.11 44.9576C209.219 48.6776 208.273 53.0254 208.273 57.9778C208.273 62.9301 209.219 67.2547 211.11 70.9631C213 74.6715 215.673 77.5546 219.116 79.6122C222.559 81.6699 226.632 82.7045 231.336 82.7045C236.039 82.7045 240.112 81.6699 243.555 79.6122C246.998 77.5546 249.671 74.6715 251.562 70.9631C253.453 67.2547 254.398 62.9301 254.398 57.9778C254.398 53.0254 253.453 48.6892 251.562 44.9576C249.671 41.2375 246.998 38.3428 243.555 36.2852ZM241.63 65.8713C240.789 68.2428 239.506 70.1261 237.79 71.5327C236.074 72.9394 233.95 73.6369 231.394 73.6369C228.838 73.6369 226.621 72.9394 224.893 71.5327C223.166 70.1261 221.882 68.2428 221.042 65.8713C220.19 63.4997 219.77 60.8608 219.77 57.9429C219.77 55.025 220.19 52.3512 221.042 49.968C221.882 47.5848 223.178 45.6899 224.893 44.2717C226.621 42.8534 228.78 42.1443 231.394 42.1443C234.008 42.1443 236.074 42.8534 237.79 44.2717C239.506 45.6899 240.778 47.5848 241.63 49.968C242.482 52.3512 242.902 55.0133 242.902 57.9429C242.902 60.8724 242.482 63.4997 241.63 65.8713Z"
				fill={ color }
			></path>
			<path
				d="M283.298 33.1382C280.544 33.1382 278.093 33.8938 275.945 35.4051C273.81 36.9164 272.292 39.0554 271.417 41.8222H270.915V33.8357H259.921V81.7779H271.265V53.5985C271.265 51.5641 271.732 49.7622 272.678 48.1928C273.623 46.635 274.907 45.4144 276.552 44.5309C278.198 43.6473 280.042 43.2056 282.12 43.2056C283.077 43.2056 284.08 43.2753 285.107 43.4032C286.146 43.5427 286.893 43.6938 287.383 43.8566V33.4637C286.858 33.3591 286.204 33.2777 285.422 33.2312C284.64 33.1847 283.929 33.1498 283.31 33.1498L283.298 33.1382Z"
				fill={ color }
			></path>
			<path
				d="M322.477 41.7465H322.01C321.427 40.584 320.598 39.3401 319.536 38.0148C318.474 36.6895 317.027 35.5619 315.206 34.6086C313.385 33.667 311.075 33.1904 308.25 33.1904C304.55 33.1904 301.201 34.132 298.19 36.0153C295.178 37.8986 292.797 40.677 291.035 44.3505C289.273 48.0241 288.386 52.523 288.386 57.8474C288.386 63.1717 289.249 67.5893 290.988 71.2628C292.727 74.948 295.085 77.7497 298.073 79.6911C301.061 81.6325 304.445 82.5974 308.227 82.5974C310.981 82.5974 313.269 82.144 315.089 81.2256C316.91 80.3072 318.369 79.2028 319.478 77.9008C320.587 76.5988 321.427 75.3665 322.01 74.204H322.699V81.7604H333.857V17.8335H322.477V41.7465ZM321.38 65.9385C320.505 68.2635 319.221 70.0887 317.529 71.3907C315.836 72.6927 313.794 73.3438 311.39 73.3438C308.985 73.3438 306.815 72.6695 305.111 71.3326C303.407 69.9957 302.123 68.1473 301.259 65.8106C300.395 63.474 299.964 60.8002 299.964 57.8009C299.964 54.8016 300.395 52.1859 301.247 49.8725C302.099 47.5591 303.383 45.7572 305.076 44.4435C306.768 43.1299 308.88 42.4789 311.401 42.4789C313.922 42.4789 315.906 43.1183 317.587 44.3854C319.268 45.6526 320.54 47.4312 321.415 49.7214C322.279 52.0115 322.711 54.7086 322.711 57.8009C322.711 60.8932 322.267 63.6135 321.392 65.9501L321.38 65.9385Z"
				fill={ color }
			></path>
			<path
				d="M379.327 20.5766C375.977 18.7514 371.834 17.833 366.897 17.833H342.831V81.7599H354.456V60.1603H366.734C371.682 60.1603 375.849 59.2535 379.234 57.4284C382.618 55.6032 385.174 53.1038 386.913 49.9185C388.652 46.7332 389.516 43.0945 389.516 38.9908C389.516 34.8872 388.652 31.3066 386.937 28.1097C385.209 24.9127 382.677 22.4017 379.327 20.5766ZM376.351 45.0127C375.464 46.7565 374.098 48.1399 372.266 49.128C370.422 50.1278 368.064 50.6276 365.181 50.6276H354.467V27.5052H365.123C368.029 27.5052 370.398 27.9934 372.254 28.9583C374.098 29.9232 375.475 31.2717 376.362 33.0039C377.249 34.736 377.693 36.7239 377.693 39.0025C377.693 41.281 377.249 43.2805 376.362 45.0243L376.351 45.0127Z"
				fill={ color }
			></path>
			<path
				d="M417.444 33.1382C414.689 33.1382 412.238 33.8938 410.091 35.4051C407.955 36.9164 406.438 39.0554 405.563 41.8222H405.061V33.8357H394.066V81.7779H405.411V53.5985C405.411 51.5641 405.878 49.7622 406.823 48.1928C407.768 46.635 409.052 45.4144 410.698 44.5309C412.344 43.6473 414.188 43.2056 416.265 43.2056C417.222 43.2056 418.226 43.2753 419.253 43.4032C420.292 43.5427 421.039 43.6938 421.529 43.8566V33.4637C421.004 33.3591 420.35 33.2777 419.568 33.2312C418.786 33.1847 418.074 33.1498 417.456 33.1498L417.444 33.1382Z"
				fill={ color }
			></path>
			<path
				d="M460.407 38.9938C458.364 37.0176 456.03 35.5528 453.392 34.6111C450.755 33.6695 447.942 33.1929 444.978 33.1929C440.379 33.1929 436.376 34.2391 432.98 36.3317C429.572 38.4242 426.922 41.3421 425.031 45.0738C423.141 48.8055 422.195 53.1417 422.195 58.0708C422.195 62.9998 423.141 67.4407 425.02 71.1375C426.899 74.8343 429.595 77.6824 433.085 79.6936C436.586 81.7048 440.741 82.7045 445.573 82.7045C449.307 82.7045 452.634 82.1349 455.54 81.0072C458.446 79.868 460.827 78.2753 462.694 76.206C464.562 74.1368 465.834 71.7071 466.499 68.9171L455.913 67.7313C455.412 69.0798 454.665 70.2191 453.684 71.1375C452.704 72.0559 451.548 72.7417 450.206 73.2184C448.864 73.695 447.37 73.9159 445.724 73.9159C443.262 73.9159 441.103 73.3928 439.27 72.3349C437.426 71.2886 436.002 69.7657 434.975 67.7778C433.983 65.8596 433.493 63.5578 433.458 60.8957H466.978V57.4314C466.978 53.2231 466.394 49.6076 465.227 46.5502C464.06 43.5044 462.449 40.9934 460.418 39.0171L460.407 38.9938ZM433.493 53.2579C433.598 51.3863 434.065 49.6309 434.94 48.0266C435.909 46.2247 437.275 44.7716 439.025 43.6555C440.776 42.5395 442.818 41.9815 445.141 41.9815C447.312 41.9815 449.214 42.4698 450.86 43.4463C452.505 44.4228 453.778 45.7597 454.7 47.457C455.622 49.1542 456.088 51.084 456.112 53.2463H433.505L433.493 53.2579Z"
				fill={ color }
			></path>
			<path
				d="M497.626 54.4205L489.421 52.6767C486.981 52.1187 485.231 51.3979 484.169 50.526C483.118 49.6541 482.593 48.5149 482.616 47.1198C482.593 45.4923 483.387 44.1787 484.986 43.1557C486.585 42.1326 488.557 41.6211 490.926 41.6211C492.677 41.6211 494.159 41.9001 495.373 42.4698C496.587 43.0394 497.556 43.7718 498.267 44.6902C498.991 45.6086 499.493 46.5851 499.785 47.6197L510.125 46.4921C509.355 42.4116 507.336 39.1798 504.091 36.7851C500.847 34.3903 496.4 33.1929 490.763 33.1929C486.923 33.1929 483.527 33.7858 480.597 34.9831C477.656 36.1805 475.369 37.8662 473.735 40.0401C472.101 42.214 471.284 44.7832 471.307 47.736C471.284 51.2352 472.381 54.1182 474.598 56.3967C476.816 58.6753 480.224 60.2912 484.846 61.2444L493.05 62.965C495.268 63.4416 496.902 64.1275 497.952 65.0226C499.003 65.9178 499.54 67.057 499.54 68.4288C499.54 70.0563 498.723 71.4165 497.077 72.5209C495.431 73.6253 493.272 74.1716 490.576 74.1716C487.88 74.1716 485.849 73.6253 484.215 72.5209C482.581 71.4165 481.519 69.789 481.017 67.615L469.953 68.6729C470.642 73.0789 472.789 76.5199 476.372 78.9845C479.967 81.449 484.706 82.6813 490.599 82.6813C494.614 82.6813 498.162 82.0303 501.255 80.7399C504.348 79.4495 506.764 77.6592 508.515 75.3574C510.254 73.0556 511.141 70.4051 511.164 67.3825C511.141 63.9531 510.02 61.1747 507.791 59.0473C505.562 56.9199 502.177 55.3737 497.626 54.3972V54.4205Z"
				fill={ color }
			></path>
			<path
				d="M541.943 54.4205L533.738 52.6767C531.299 52.1187 529.548 51.3979 528.486 50.526C527.436 49.6541 526.91 48.5149 526.934 47.1198C526.91 45.4923 527.704 44.1787 529.303 43.1557C530.902 42.1326 532.874 41.6211 535.244 41.6211C536.994 41.6211 538.477 41.9001 539.69 42.4698C540.904 43.0394 541.873 43.7718 542.585 44.6902C543.308 45.6086 543.81 46.5851 544.102 47.6197L554.443 46.4921C553.672 42.4116 551.653 39.1798 548.409 36.7851C545.164 34.3903 540.717 33.1929 535.08 33.1929C531.24 33.1929 527.844 33.7858 524.915 34.9831C521.973 36.1805 519.686 37.8662 518.052 40.0401C516.418 42.214 515.601 44.7832 515.624 47.736C515.601 51.2352 516.698 54.1182 518.916 56.3967C521.133 58.6753 524.541 60.2912 529.163 61.2444L537.368 62.965C539.585 63.4416 541.219 64.1275 542.27 65.0226C543.32 65.9178 543.857 67.057 543.857 68.4288C543.857 70.0563 543.04 71.4165 541.394 72.5209C539.749 73.6253 537.59 74.1716 534.893 74.1716C532.197 74.1716 530.167 73.6253 528.533 72.5209C526.899 71.4165 525.837 69.789 525.335 67.615L514.271 68.6729C514.959 73.0789 517.107 76.5199 520.69 78.9845C524.284 81.449 529.023 82.6813 534.917 82.6813C538.932 82.6813 542.48 82.0303 545.573 80.7399C548.666 79.4495 551.081 77.6592 552.832 75.3574C554.571 73.0556 555.458 70.4051 555.482 67.3825C555.458 63.9531 554.338 61.1747 552.109 59.0473C549.879 56.9199 546.495 55.3737 541.943 54.3972V54.4205Z"
				fill={ color }
			></path>
			<path
				d="M567.56 68.7788C565.658 68.7788 564.024 69.4414 562.67 70.7783C561.316 72.1152 560.639 73.7079 560.663 75.5795C560.639 77.4977 561.305 79.1136 562.67 80.4505C564.024 81.7874 565.658 82.45 567.56 82.45C568.798 82.45 569.93 82.1478 570.957 81.5316C571.995 80.9155 572.824 80.0901 573.466 79.0555C574.108 78.0092 574.435 76.8583 574.458 75.5912C574.435 73.7195 573.746 72.1152 572.369 70.79C570.992 69.4647 569.393 68.7904 567.56 68.7904V68.7788Z"
				fill={ color }
			></path>
			<path
				d="M595.384 44.167C597.134 42.9348 599.177 42.307 601.499 42.307C604.23 42.307 606.425 43.0859 608.059 44.632C609.693 46.1782 610.743 48.108 611.175 50.4214H622.017C621.772 46.9687 620.745 43.9462 618.948 41.3537C617.15 38.7613 614.746 36.7502 611.723 35.3319C608.7 33.9136 605.246 33.1929 601.336 33.1929C596.632 33.1929 592.571 34.2391 589.128 36.3317C585.697 38.4242 583.036 41.3421 581.156 45.0738C579.277 48.8055 578.332 53.1068 578.332 57.9778C578.332 62.8487 579.254 67.1035 581.11 70.8236C582.966 74.5436 585.603 77.4499 589.035 79.5425C592.466 81.6466 596.586 82.6929 601.394 82.6929C605.421 82.6929 608.934 81.9605 611.922 80.4957C614.91 79.031 617.267 76.9849 619.006 74.3809C620.745 71.7652 621.737 68.7659 622.017 65.3714H611.175C610.836 67.1035 610.229 68.5683 609.331 69.7773C608.432 70.9863 607.323 71.9047 605.993 72.5441C604.662 73.1835 603.168 73.4974 601.499 73.4974C599.142 73.4974 597.088 72.8696 595.337 71.6141C593.598 70.3586 592.244 68.5567 591.275 66.2084C590.307 63.8601 589.84 61.0584 589.84 57.7918C589.84 54.5251 590.33 51.7932 591.299 49.4914C592.267 47.178 593.633 45.4109 595.384 44.167Z"
				fill={ color }
			></path>
			<path
				d="M660.17 36.2852C656.727 34.2275 652.653 33.1929 647.95 33.1929C643.247 33.1929 639.173 34.2275 635.73 36.2852C632.287 38.3428 629.615 41.2375 627.724 44.9576C625.833 48.6776 624.888 53.0254 624.888 57.9778C624.888 62.9301 625.833 67.2547 627.724 70.9631C629.615 74.6715 632.287 77.5546 635.73 79.6122C639.173 81.6699 643.247 82.7045 647.95 82.7045C652.653 82.7045 656.727 81.6699 660.17 79.6122C663.613 77.5546 666.285 74.6715 668.176 70.9631C670.067 67.2547 671.012 62.9301 671.012 57.9778C671.012 53.0254 670.067 48.6892 668.176 44.9576C666.285 41.2375 663.613 38.3428 660.17 36.2852ZM658.244 65.8713C657.404 68.2428 656.12 70.1261 654.404 71.5327C652.689 72.9394 650.564 73.6369 648.008 73.6369C645.452 73.6369 643.235 72.9394 641.507 71.5327C639.78 70.1261 638.496 68.2428 637.656 65.8713C636.804 63.4997 636.384 60.8608 636.384 57.9429C636.384 55.025 636.804 52.3512 637.656 49.968C638.496 47.5848 639.792 45.6899 641.507 44.2717C643.235 42.8534 645.394 42.1443 648.008 42.1443C650.623 42.1443 652.689 42.8534 654.404 44.2717C656.12 45.6899 657.392 47.5848 658.244 49.968C659.096 52.3512 659.516 55.0133 659.516 57.9429C659.516 60.8724 659.096 63.4997 658.244 65.8713Z"
				fill={ color }
			></path>
			<path
				d="M740.026 37.3739C737.224 34.5839 733.606 33.1889 729.183 33.1889C725.693 33.1889 722.682 33.9794 720.138 35.572C717.605 37.1647 715.796 39.2921 714.734 41.9543H714.232C713.31 39.2456 711.735 37.1066 709.482 35.5372C707.241 33.9678 704.487 33.1772 701.23 33.1772C697.974 33.1772 695.243 33.9561 692.921 35.5023C690.598 37.0484 688.941 39.1991 687.937 41.9426H687.377V33.7934H676.534V81.7356H687.879V52.5797C687.879 50.6034 688.275 48.8712 689.069 47.3832C689.863 45.8952 690.925 44.7443 692.267 43.9189C693.609 43.0935 695.091 42.6866 696.714 42.6866C699.118 42.6866 701.067 43.4307 702.561 44.9071C704.055 46.3835 704.802 48.3597 704.802 50.8359V81.7356H715.924V51.8357C715.924 49.127 716.695 46.9298 718.224 45.2326C719.764 43.5353 721.9 42.6866 724.631 42.6866C726.93 42.6866 728.868 43.3842 730.455 44.7676C732.042 46.151 732.836 48.3365 732.836 51.3009V81.7356H744.215V49.5571C744.215 44.2095 742.815 40.1407 740.014 37.3507L740.026 37.3739Z"
				fill={ color }
			></path>
		</svg>
	);
};

export default WordPressWordmark;
