document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Pitch Toggle Control
    const toggleBtn = document.getElementById("toggle-pitch-btn");
    if (toggleBtn) {
        let isPitchView = false;
        toggleBtn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Switch to Pitch View';
        
        toggleBtn.addEventListener("click", () => {
            isPitchView = !isPitchView;
            if (isPitchView) {
                document.body.classList.remove("customer-view");
                toggleBtn.innerHTML = '<i class="fa-solid fa-eye"></i> Switch to Customer View';
            } else {
                document.body.classList.add("customer-view");
                toggleBtn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Switch to Pitch View';
            }
        });
    }

    // 2. Mobile Nav Drawer Toggle
    const mobileToggle = document.getElementById("mobile-nav-toggle");
    const desktopNav = document.querySelector(".desktop-nav");

    if (mobileToggle && desktopNav) {
        mobileToggle.addEventListener("click", () => {
            desktopNav.classList.toggle("active");
            const icon = mobileToggle.querySelector("i");
            if (desktopNav.classList.contains("active")) {
                icon.className = "fa-solid fa-xmark";
            } else {
                icon.className = "fa-solid fa-bars";
            }
        });
        
        // Close menu drawer when clicking standard links
        desktopNav.querySelectorAll("a:not(.dropdown-trigger)").forEach(link => {
            link.addEventListener("click", () => {
                desktopNav.classList.remove("active");
                const icon = mobileToggle.querySelector("i");
                if (icon) icon.className = "fa-solid fa-bars";
            });
        });
    }

    // 3. Collapsible navigation dropdowns on mobile viewports
    const dropdownTriggers = document.querySelectorAll(".dropdown-trigger");
    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener("click", (e) => {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                const parent = trigger.parentElement;
                parent.classList.toggle("open");
            }
        });
    });

    // 4. Dynamic Pricing Estimate Calculator
    const selectFields = document.querySelectorAll(".calc-select-field");
    const calcTotal = document.getElementById("calc-total");
    const calcSelectedList = document.getElementById("calc-selected-list");
    const calcSelectedHidden = document.getElementById("calc-selected-hidden");

    function updateCalculator() {
        let total = 0;
        calcSelectedList.innerHTML = "";
        let selectedCount = 0;
        const selectedNames = [];

        selectFields.forEach(select => {
            const selectedOption = select.options[select.selectedIndex];
            const price = parseFloat(selectedOption.value);
            const name = selectedOption.dataset.name;

            if (price > 0) {
                selectedCount++;
                total += price;
                selectedNames.push(`${name} ($${price})`);

                const li = document.createElement("li");
                li.innerHTML = `<span><i class="fa-solid fa-circle-check" style="color: #0284c7; margin-right: 6px;"></i>${name}</span> <span>$${price}</span>`;
                calcSelectedList.appendChild(li);
            }
        });

        if (selectedCount === 0) {
            const emptyLi = document.createElement("li");
            emptyLi.className = "empty-msg";
            emptyLi.textContent = "No services selected yet";
            calcSelectedList.appendChild(emptyLi);
        }

        calcTotal.textContent = total.toLocaleString();
        if (calcSelectedHidden) {
            calcSelectedHidden.value = selectedNames.join(", ") || "None";
        }
    }

    selectFields.forEach(select => {
        select.addEventListener("change", updateCalculator);
    });

    // 5. FAQ Accordion Toggle
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(btn => {
        btn.addEventListener("click", () => {
            const faqItem = btn.parentElement;
            const isActive = faqItem.classList.contains("active");

            // Close all items
            document.querySelectorAll(".faq-item").forEach(item => {
                item.classList.remove("active");
            });

            // Toggle current item
            if (!isActive) {
                faqItem.classList.add("active");
            }
        });
    });
});
