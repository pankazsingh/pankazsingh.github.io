(function () {
  const { loadSiteData, publicationUrlFromDoi, escapeHtml } = window.PankazLabData;

  function setText(id, value) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = value ?? '';
    }
  }

  function setLink(id, href, label) {
    const element = document.getElementById(id);
    if (!element) return;
    if (href) {
      element.setAttribute('href', href);
      if (href.startsWith('http')) {
        element.setAttribute('target', '_blank');
        element.setAttribute('rel', 'noreferrer');
      } else {
        element.removeAttribute('target');
        element.removeAttribute('rel');
      }
    }
    if (label !== undefined) {
      element.textContent = label;
    }
  }

  function clear(node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }

  function buildPublicationCard(publication) {
    const article = document.createElement('article');
    article.className = 'publication-card';

    const year = document.createElement('span');
    year.className = 'pub-year';
    year.textContent = publication.year;
    article.appendChild(year);

    const title = document.createElement('h3');
    title.textContent = publication.title;
    article.appendChild(title);

    const venue = document.createElement('p');
    const venueEm = document.createElement('em');
    venueEm.textContent = publication.venue;
    venue.appendChild(venueEm);
    article.appendChild(venue);

    const doi = document.createElement('a');
    doi.className = 'pub-link';
    doi.href = publication.url || publicationUrlFromDoi(publication.doi);
    doi.target = '_blank';
    doi.rel = 'noreferrer';
    doi.textContent = publication.doi;
    article.appendChild(doi);

    return article;
  }

  function buildThemeCard(theme) {
    const article = document.createElement('article');
    article.className = 'theme-card';

    const title = document.createElement('h3');
    title.textContent = theme.title;
    article.appendChild(title);

    const description = document.createElement('p');
    description.textContent = theme.description;
    article.appendChild(description);

    return article;
  }

  function buildMemberCard(member) {
    const article = document.createElement('article');
    article.className = 'member-card';

    const status = document.createElement('span');
    status.className = `member-badge ${member.status === 'past' ? 'member-badge-past' : 'member-badge-current'}`;
    status.textContent = member.status === 'past' ? 'Past member' : 'Current member';
    article.appendChild(status);

    const name = document.createElement('h3');
    name.textContent = member.name;
    article.appendChild(name);

    const role = document.createElement('p');
    role.className = 'member-role';
    role.textContent = member.role;
    article.appendChild(role);

    const affiliation = document.createElement('p');
    affiliation.textContent = member.affiliation;
    article.appendChild(affiliation);

    const expertise = document.createElement('p');
    expertise.className = 'member-expertise';
    expertise.textContent = member.expertise;
    article.appendChild(expertise);

    if (member.email) {
      const email = document.createElement('a');
      email.href = `mailto:${member.email}`;
      email.textContent = member.email;
      article.appendChild(email);
    }

    return article;
  }

  function renderMemberSection(container, members) {
    if (!container) return;
    clear(container);
    if (!members.length) {
      const emptyState = document.createElement('p');
      emptyState.className = 'empty-state';
      emptyState.textContent = 'No members have been added yet.';
      container.appendChild(emptyState);
      return;
    }
    members.forEach((member) => container.appendChild(buildMemberCard(member)));
  }

  function renderSite(siteData) {
    document.title = siteData.siteTitle || 'PankazLab';

    setText('hero-eyebrow', siteData.hero.eyebrow);
    setText('hero-title', siteData.hero.headline);
    setText('hero-lead', siteData.hero.lead);
    setText('hero-summary', siteData.hero.summary);

    const profileName = document.getElementById('profile-name');
    if (profileName) {
      profileName.innerHTML = `<strong>${escapeHtml(siteData.profile.name)}</strong><br />${escapeHtml(siteData.profile.credentials)}`;
    }

    const profileAffiliation = document.getElementById('profile-affiliation');
    if (profileAffiliation) {
      profileAffiliation.innerHTML = `<strong>${escapeHtml(siteData.profile.position)}</strong><br />${siteData.profile.affiliationLines.map(escapeHtml).join('<br />')}`;
    }

    const profileEmail = document.getElementById('profile-email');
    if (profileEmail) {
      profileEmail.innerHTML = `<a href="mailto:${escapeHtml(siteData.profile.email)}">${escapeHtml(siteData.profile.email)}</a>`;
    }

    setLink('scholar-button', siteData.profile.scholarUrl, 'Google Scholar');
    setLink('linkedin-button', siteData.profile.linkedinUrl, 'LinkedIn');
    setLink('contact-scholar-link', siteData.profile.scholarUrl, 'Google Scholar profile');
    setLink('contact-linkedin-link', siteData.profile.linkedinUrl, 'LinkedIn profile');
    setLink('contact-email-link', `mailto:${siteData.profile.email}`, siteData.profile.email);

    const profilePhoto = document.getElementById('profile-photo');
    if (profilePhoto) {
      profilePhoto.src = siteData.profile.profileImage;
    }

    const brandLogo = document.querySelector('.brand-logo');
    if (brandLogo) {
      brandLogo.src = siteData.profile.logoImage;
    }

    const statsStrip = document.getElementById('stats-strip');
    if (statsStrip) {
      clear(statsStrip);
      siteData.stats.forEach((stat) => {
        const card = document.createElement('div');
        card.className = 'stat';
        const span = document.createElement('span');
        span.textContent = stat;
        card.appendChild(span);
        statsStrip.appendChild(card);
      });
    }

    const aboutCopy = document.getElementById('about-copy');
    if (aboutCopy) {
      clear(aboutCopy);
      siteData.about.forEach((paragraph) => {
        const p = document.createElement('p');
        p.textContent = paragraph;
        aboutCopy.appendChild(p);
      });
    }

    const themeGrid = document.getElementById('theme-grid');
    if (themeGrid) {
      clear(themeGrid);
      siteData.themes.forEach((theme) => themeGrid.appendChild(buildThemeCard(theme)));
    }

    const currentMemberGrid = document.getElementById('member-current-grid');
    const pastMemberGrid = document.getElementById('member-past-grid');
    const legacyMemberGrid = document.getElementById('member-grid');
    const currentMembers = siteData.labMembers.filter((member) => (member.status || 'current') !== 'past' && member.visible !== false);
    const pastMembers = siteData.labMembers.filter((member) => (member.status || 'current') === 'past' && member.visible !== false);

    if (currentMemberGrid || pastMemberGrid) {
      renderMemberSection(currentMemberGrid, currentMembers);
      renderMemberSection(pastMemberGrid, pastMembers);
    } else if (legacyMemberGrid) {
      renderMemberSection(legacyMemberGrid, siteData.labMembers.filter((member) => member.visible !== false));
    }

    const publicationList = document.getElementById('publication-list');
    if (publicationList) {
      clear(publicationList);
      const featuredPublications = siteData.publications.filter((publication) => publication.featured);
      if (!featuredPublications.length) {
        const emptyState = document.createElement('p');
        emptyState.className = 'empty-state';
        emptyState.textContent = 'No publications are selected for display yet.';
        publicationList.appendChild(emptyState);
      } else {
        featuredPublications.forEach((publication) => publicationList.appendChild(buildPublicationCard(publication)));
      }
    }

    const yearElement = document.getElementById('year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }

    const navLinks = Array.from(document.querySelectorAll('.site-nav a'));
    const sections = navLinks
      .map((link) => document.querySelector(link.getAttribute('href')))
      .filter(Boolean);

    if ('IntersectionObserver' in window && sections.length) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const id = `#${entry.target.id}`;
            const navLink = navLinks.find((link) => link.getAttribute('href') === id);
            if (navLink) {
              navLink.classList.toggle('is-active', entry.isIntersecting);
            }
          });
        },
        { threshold: 0.35 },
      );

      sections.forEach((section) => observer.observe(section));
    }
  }

  function refreshFromStorage() {
    renderSite(loadSiteData());
  }

  refreshFromStorage();
  window.addEventListener('pankazlab-data-updated', refreshFromStorage);
  window.addEventListener('storage', (event) => {
    if (event.key === window.PankazLabData.STORAGE_KEY) {
      refreshFromStorage();
    }
  });
})();
