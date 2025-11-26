document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".m4l-lab-tab");
  const slides = document.querySelectorAll(".m4l-lab-slide");

  if (!tabs.length || !slides.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const key = tab.dataset.lab;

      // 탭 활성화
      tabs.forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");

      // 슬라이드 전환
      slides.forEach((slide) => {
        const isTarget = slide.dataset.labPanel === key;
        slide.classList.toggle("is-active", isTarget);
      });
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const nodes = document.querySelectorAll(".process-node");
  if (!nodes.length) return;

  let current = 0;

  function setActive(index) {
    nodes.forEach((node, i) => {
      node.classList.toggle("is-active", i === index);
    });
  }

  setActive(current);

  setInterval(() => {
    current = (current + 1) % nodes.length; // 0→1→2→3→0…
    setActive(current);
  }, 2500); // 2.5초 간격 (원하면 시간 조절)
});

// =============================
// Portfolio slider (4개씩 슬라이드)
// =============================
document.addEventListener("DOMContentLoaded", function () {
  // ===== PORTFOLIO SLIDER =====
  const VISIBLE_COUNT = 4; // 한 화면에 보이는 카드/탭 개수

  const items = Array.from(document.querySelectorAll(".portfolio-item"));
  if (!items.length) return; // 포트폴리오가 없으면 바로 종료

  const tabs = Array.from(document.querySelectorAll(".portfolio-tab"));
  const prevBtn = document.querySelector(".portfolio-arrow--prev");
  const nextBtn = document.querySelector(".portfolio-arrow--next");

  let startIndex = 0; // 현재 첫 번째로 보이는 인덱스

  // startIndex가 범위를 넘어가지 않도록 보정
  function clampStartIndex(value) {
    const maxStart = Math.max(0, items.length - VISIBLE_COUNT);
    return Math.min(Math.max(0, value), maxStart);
  }

  // 실제 화면에 어떤 것들을 보여줄지 결정
  function renderPortfolio() {
    const maxStart = Math.max(0, items.length - VISIBLE_COUNT);

    items.forEach((item, idx) => {
      const visible = idx >= startIndex && idx < startIndex + VISIBLE_COUNT;
      item.style.display = visible ? "flex" : "none";
    });

    // 탭 active 처리 (현재 화면의 첫 번째 탭을 기준으로)
    tabs.forEach((tab, idx) => {
      const visible = idx >= startIndex && idx < startIndex + VISIBLE_COUNT;
      tab.classList.toggle("is-active", visible && idx === startIndex);
    });

    // 화살표 상태
    if (prevBtn) {
      const isDisabled = startIndex === 0;
      prevBtn.disabled = isDisabled;
      prevBtn.classList.toggle("is-disabled", isDisabled);
    }
    if (nextBtn) {
      const isDisabled = startIndex === maxStart;
      nextBtn.disabled = isDisabled;
      nextBtn.classList.toggle("is-disabled", isDisabled);
    }
  }

  // 화살표 클릭 이벤트
  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      const nextStart = clampStartIndex(startIndex - VISIBLE_COUNT);
      if (nextStart !== startIndex) {
        startIndex = nextStart;
        renderPortfolio();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      const nextStart = clampStartIndex(startIndex + VISIBLE_COUNT);
      if (nextStart !== startIndex) {
        startIndex = nextStart;
        renderPortfolio();
      }
    });
  }

  // 탭 클릭 시, 해당 탭/카드를 첫 번째에 오도록 슬라이드
  tabs.forEach((tab, idx) => {
    tab.addEventListener("click", function () {
      const nextStart = clampStartIndex(idx);
      if (nextStart !== startIndex) {
        startIndex = nextStart;
        renderPortfolio();
      } else {
        // 이미 같은 페이지면 active만 갱신
        tabs.forEach((t) => t.classList.remove("is-active"));
        tab.classList.add("is-active");
      }
    });
  });

  // 최초 렌더링
  renderPortfolio();
});

const tabs = document.querySelectorAll(".service-tab");
const hiddenInput = document.getElementById("selectedService");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    hiddenInput.value = tab.dataset.value;
  });
});

// CONTACT – 연구소 선택 탭
document.addEventListener("click", (e) => {
  const tab = e.target.closest(".contact-tab");
  if (!tab) return;

  document
    .querySelectorAll(".contact-tab")
    .forEach((btn) => btn.classList.remove("active"));

  tab.classList.add("active");
});

// =========================
// 공통 리빌 애니메이션
// =========================

(function initRevealAnimations() {
  const options = {
    threshold: 0.2,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const el = entry.target;

      if (entry.isIntersecting) {
        el.classList.add("is-visible");
      } else {
        // 🔥 섹션 밖으로 나가면 다시 리셋 → 다시 들어올 때 또 재생
        el.classList.remove("is-visible");
      }
    });
  }, options);

  // 개별 요소
  const revealEls = document.querySelectorAll(
    ".reveal, .reveal-up, .reveal-down, .reveal-left, .reveal-right, .reveal-scale"
  );

  // 스태거 그룹
  const staggerGroups = document.querySelectorAll(".reveal-stagger");

  [...revealEls, ...staggerGroups].forEach((el) => observer.observe(el));
})();

// =========================
// 스크롤 리빌 애니메이션
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const revealSections = document.querySelectorAll(
    ".hero, .m4l-labs, .m4l-process, .m4l-portfolio, .m4l-clients, .m4l-contact"
  );

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;

        if (entry.isIntersecting) {
          // 화면 안에 들어오면 효과 ON
          el.classList.add("is-visible");
        } else {
          // 화면 밖으로 나가면 효과 리셋 → 다시 들어올 때 또 재생
          el.classList.remove("is-visible");
        }
      });
    },
    {
      threshold: 0.25, // 섹션의 25% 정도 보이면 트리거
    }
  );

  revealSections.forEach((sec) => io.observe(sec));
});
