(function () {
  const {
    loadSiteData,
    saveSiteData,
    resetSiteData,
    escapeHtml,
    publicationUrlFromDoi,
  } = window.PankazLabData;

  let currentData = loadSiteData();

  const form = document.getElementById('admin-form');
  const profileSection = document.getElementById('profile-section');
  const publicationEditor = document.getElementById('publication-editor');
  const memberEditor = document.getElementById('member-editor');
  const themeEditor = document.getElementById('theme-editor');
  const statusElement = document.getElementById('save-status');
  const addPublicationButton = document.getElementById('add-publication');
  const addMemberButton = document.getElementById('add-member');
  const addThemeButton = document.getElementById('add-theme');
  const resetButton = document.getElementById('reset-defaults');

  function field(name, label, value, options = {}) {
    const type = options.type || 'text';
    const className = options.className || '';
    const rows = options.rows || 3;
    const full = options.full ? ' full' : '';
    const choices = options.choices || [];

    if (type === 'textarea') {
      return `
        <label class="field-group${full}">
          <span>${label}</span>
          <textarea name="${name}" rows="${rows}" class="${className}">${escapeHtml(value ?? '')}</textarea>
        </label>
      `;
    }

    if (type === 'checkbox') {
      return `
        <label class="checkbox-row">
          <input type="checkbox" name="${name}" ${value ? 'checked' : ''} />
          <span>${label}</span>
        </label>
      `;
    }

    if (type === 'select') {
      return `
        <label class="field-group${full}">
          <span>${label}</span>
          <select name="${name}" class="${className}">
            ${choices
              .map((choice) => `<option value="${escapeHtml(choice.value)}" ${choice.value === value ? 'selected' : ''}>${escapeHtml(choice.label)}</option>`)
              .join('')}
          </select>
        </label>
      `;
    }

    return `
      <label class="field-group${full}">
        <span>${label}</span>
        <input name="${name}" type="${type}" value="${escapeHtml(value ?? '')}" class="${className}" />
      </label>
    `;
  }

  function renderProfileSection(data) {
    const affiliationLines = data.profile.affiliationLines.join('
');
    const aboutParagraphs = data.about.join('

');
    const stats = data.stats.join('
');

    return `
      <section class="form-panel">
        <div class="form-panel-header">
          <div>
            <p class="section-kicker">Profile</p>
            <h2>Homepage details</h2>
          </div>
        </div>
        <div class="field-grid">
          ${field('siteTitle', 'Site title', data.siteTitle)}
          ${field('heroHeadline', 'Hero headline', data.hero.headline)}
          ${field('heroEyebrow', 'Hero eyebrow', data.hero.eyebrow)}
          ${field('profileName', 'Profile name', data.profile.name)}
          ${field('profilePosition', 'Position', data.profile.position)}
          ${field('profileCredentials', 'Credentials', data.profile.credentials)}
          ${field('profileEmail', 'Email', data.profile.email, { type: 'email' })}
          ${field('scholarUrl', 'Google Scholar URL', data.profile.scholarUrl, { type: 'url' })}
          ${field('linkedinUrl', 'LinkedIn URL', data.profile.linkedinUrl, { type: 'url' })}
          ${field('profileImage', 'Profile photo path', data.profile.profileImage)}
          ${field('logoImage', 'Logo path', data.profile.logoImage)}
          ${field('profileAffiliationLines', 'Affiliation lines', affiliationLines, { type: 'textarea', rows: 4, full: true })}
          ${field('heroLead', 'Hero lead', data.hero.lead, { type: 'textarea', rows: 3, full: true })}
          ${field('heroSummary', 'Hero summary', data.hero.summary, { type: 'textarea', rows: 4, full: true })}
          ${field('aboutParagraphs', 'About paragraphs', aboutParagraphs, { type: 'textarea', rows: 6, full: true })}
          ${field('stats', 'Stats strip items', stats, { type: 'textarea', rows: 4, full: true })}
        </div>
      </section>
    `;
  }

  function renderThemeCard(theme, index) {
    return `
      <article class="repeatable-card">
        <div class="repeatable-card-header">
          <h3>Theme ${index + 1}</h3>
          <button type="button" class="mini-action" data-remove-theme="${index}">Remove</button>
        </div>
        <div class="field-grid">
          ${field(`themeTitle_${index}`, 'Theme title', theme.title)}
          ${field(`themeDescription_${index}`, 'Theme description', theme.description, { type: 'textarea', rows: 3, full: true })}
        </div>
      </article>
    `;
  }

  function reorder(array, index, direction) {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= array.length) {
      return;
    }
    const [item] = array.splice(index, 1);
    array.splice(nextIndex, 0, item);
  }

  function renderPublicationCard(publication, index) {
    const isFirst = index === 0;
    const isLast = index === currentData.publications.length - 1;
    return `
      <article class="repeatable-card">
        <div class="repeatable-card-header">
          <h3>Publication ${index + 1}</h3>
          <div class="repeatable-card-actions">
            <button type="button" class="mini-action" data-move-publication="${index}" data-direction="up" ${isFirst ? 'disabled' : ''}>Up</button>
            <button type="button" class="mini-action" data-move-publication="${index}" data-direction="down" ${isLast ? 'disabled' : ''}>Down</button>
            <button type="button" class="mini-action" data-remove-publication="${index}">Remove</button>
          </div>
        </div>
        ${field(`publicationFeatured_${index}`, 'Display on homepage', publication.featured, { type: 'checkbox' })}
        <div class="field-grid">
          ${field(`publicationYear_${index}`, 'Year', publication.year)}
          ${field(`publicationDoi_${index}`, 'DOI', publication.doi)}
          ${field(`publicationTitle_${index}`, 'Title', publication.title, { type: 'textarea', rows: 3, full: true })}
          ${field(`publicationVenue_${index}`, 'Venue line', publication.venue, { type: 'textarea', rows: 2, full: true })}
        </div>
      </article>
    `;
  }

  function renderMemberCard(member, index) {
    return `
      <article class="repeatable-card">
        <div class="repeatable-card-header">
          <h3>Member ${index + 1}</h3>
          <button type="button" class="mini-action" data-remove-member="${index}">Remove</button>
        </div>
        <div class="field-grid">
          ${field(`memberStatus_${index}`, 'Status', member.status || 'current', {
            type: 'select',
            choices: [
              { value: 'current', label: 'Current member' },
              { value: 'past', label: 'Past member' },
            ],
          })}
          ${field(`memberVisible_${index}`, 'Show on homepage', member.visible !== false, { type: 'checkbox' })}
          ${field(`memberName_${index}`, 'Name', member.name)}
          ${field(`memberRole_${index}`, 'Role', member.role)}
          ${field(`memberAffiliation_${index}`, 'Affiliation', member.affiliation, { type: 'textarea', rows: 2, full: true })}
          ${field(`memberExpertise_${index}`, 'Expertise', member.expertise, { type: 'textarea', rows: 2, full: true })}
          ${field(`memberEmail_${index}`, 'Email', member.email, { type: 'email' })}
        </div>
      </article>
    `;
  }

  function renderEditors() {
    publicationEditor.innerHTML = currentData.publications.map(renderPublicationCard).join('');
    memberEditor.innerHTML = currentData.labMembers.map(renderMemberCard).join('');
    themeEditor.innerHTML = currentData.themes.map(renderThemeCard).join('');
  }

  function renderPage() {
    if (profileSection) {
      profileSection.innerHTML = renderProfileSection(currentData);
    }

    const yearElement = document.getElementById('year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }

    const summaryNote = document.getElementById('profile-summary-note');
    if (summaryNote) {
      summaryNote.textContent = `There are ${currentData.publications.filter((publication) => publication.featured).length} publications selected for the homepage.`;
    }

    renderEditors();
  }

  function readLines(name) {
    const value = form.elements[name].value || '';
    return value
      .split(/
+/)
      .map((line) => line.trim())
      .filter(Boolean);
  }

  function readParagraphs(name) {
    const value = form.elements[name].value || '';
    return value
      .split(/
\s*
+/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);
  }

  function collectData() {
    const nextData = JSON.parse(JSON.stringify(currentData));
    nextData.siteTitle = form.elements.siteTitle.value.trim() || 'PankazLab';
    nextData.hero.headline = form.elements.heroHeadline.value.trim() || 'PankazLab';
    nextData.hero.eyebrow = form.elements.heroEyebrow.value.trim() || 'Research profile';
    nextData.hero.lead = form.elements.heroLead.value.trim();
    nextData.hero.summary = form.elements.heroSummary.value.trim();
    nextData.profile.name = form.elements.profileName.value.trim();
    nextData.profile.position = form.elements.profilePosition.value.trim();
    nextData.profile.credentials = form.elements.profileCredentials.value.trim();
    nextData.profile.email = form.elements.profileEmail.value.trim();
    nextData.profile.scholarUrl = form.elements.scholarUrl.value.trim();
    nextData.profile.linkedinUrl = form.elements.linkedinUrl.value.trim();
    nextData.profile.profileImage = form.elements.profileImage.value.trim() || './assets/profile.jpg';
    nextData.profile.logoImage = form.elements.logoImage.value.trim() || './assets/logo.svg';
    nextData.profile.affiliationLines = readLines('profileAffiliationLines');
    nextData.about = readParagraphs('aboutParagraphs');
    nextData.stats = readLines('stats');

    nextData.themes = currentData.themes
      .map((theme, index) => ({
        ...theme,
        title: form.elements[`themeTitle_${index}`].value.trim(),
        description: form.elements[`themeDescription_${index}`].value.trim(),
      }))
      .filter((theme) => theme.title || theme.description);

    nextData.publications = currentData.publications
      .map((publication, index) => {
        const doi = form.elements[`publicationDoi_${index}`].value.trim();
        return {
          ...publication,
          featured: Boolean(form.elements[`publicationFeatured_${index}`].checked),
          year: form.elements[`publicationYear_${index}`].value.trim(),
          title: form.elements[`publicationTitle_${index}`].value.trim(),
          venue: form.elements[`publicationVenue_${index}`].value.trim(),
          doi,
          url: publicationUrlFromDoi(doi),
        };
      })
      .filter((publication) => publication.title || publication.venue || publication.doi);

    nextData.labMembers = currentData.labMembers
      .map((member, index) => ({
        ...member,
        visible: Boolean(form.elements[`memberVisible_${index}`].checked),
        status: form.elements[`memberStatus_${index}`].value || 'current',
        name: form.elements[`memberName_${index}`].value.trim(),
        role: form.elements[`memberRole_${index}`].value.trim(),
        affiliation: form.elements[`memberAffiliation_${index}`].value.trim(),
        expertise: form.elements[`memberExpertise_${index}`].value.trim(),
        email: form.elements[`memberEmail_${index}`].value.trim(),
      }))
      .filter((member) => member.name || member.role || member.affiliation || member.expertise || member.email);

    return nextData;
  }

  function updateStatus(message, kind = 'info') {
    statusElement.textContent = message;
    statusElement.dataset.kind = kind;
  }

  function addBlankPublication() {
    currentData = collectData();
    currentData.publications.push({
      id: `pub-${Date.now()}`,
      featured: false,
      year: '',
      title: '',
      venue: '',
      doi: '',
      url: '',
    });
    renderPage();
  }

  function addBlankMember() {
    currentData = collectData();
    currentData.labMembers.push({
      id: `member-${Date.now()}`,
      visible: true,
      status: 'current',
      name: '',
      role: '',
      affiliation: '',
      expertise: '',
      email: '',
    });
    renderPage();
  }

  function addBlankTheme() {
    currentData = collectData();
    currentData.themes.push({
      title: '',
      description: '',
    });
    renderPage();
  }

  function removeByIndex(collectionName, index) {
    currentData = collectData();
    currentData[collectionName].splice(index, 1);
    renderPage();
  }

  function movePublication(index, direction) {
    currentData = collectData();
    reorder(currentData.publications, index, direction);
    renderPage();
  }

  function fillFormFromData(data) {
    form.elements.siteTitle.value = data.siteTitle;
    form.elements.heroHeadline.value = data.hero.headline;
    form.elements.heroEyebrow.value = data.hero.eyebrow;
    form.elements.profileName.value = data.profile.name;
    form.elements.profilePosition.value = data.profile.position;
    form.elements.profileCredentials.value = data.profile.credentials;
    form.elements.profileEmail.value = data.profile.email;
    form.elements.scholarUrl.value = data.profile.scholarUrl;
    form.elements.linkedinUrl.value = data.profile.linkedinUrl;
    form.elements.profileImage.value = data.profile.profileImage;
    form.elements.logoImage.value = data.profile.logoImage;
    form.elements.profileAffiliationLines.value = data.profile.affiliationLines.join('
');
    form.elements.heroLead.value = data.hero.lead;
    form.elements.heroSummary.value = data.hero.summary;
    form.elements.aboutParagraphs.value = data.about.join('

');
    form.elements.stats.value = data.stats.join('
');
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    currentData = collectData();
    saveSiteData(currentData);
    updateStatus('Saved. The homepage updates after refresh, and other open tabs refresh automatically.', 'success');
  });

  addPublicationButton.addEventListener('click', addBlankPublication);
  addMemberButton.addEventListener('click', addBlankMember);
  addThemeButton.addEventListener('click', addBlankTheme);

  resetButton.addEventListener('click', () => {
    currentData = resetSiteData();
    fillFormFromData(currentData);
    renderPage();
    updateStatus('Reset to defaults.', 'info');
  });

  publicationEditor.addEventListener('click', (event) => {
    const moveButton = event.target.closest('[data-move-publication]');
    if (moveButton) {
      movePublication(Number(moveButton.dataset.movePublication), moveButton.dataset.direction === 'up' ? -1 : 1);
      return;
    }
    const button = event.target.closest('[data-remove-publication]');
    if (!button) return;
    removeByIndex('publications', Number(button.dataset.removePublication));
  });

  memberEditor.addEventListener('click', (event) => {
    const button = event.target.closest('[data-remove-member]');
    if (!button) return;
    removeByIndex('labMembers', Number(button.dataset.removeMember));
  });

  themeEditor.addEventListener('click', (event) => {
    const button = event.target.closest('[data-remove-theme]');
    if (!button) return;
    removeByIndex('themes', Number(button.dataset.removeTheme));
  });

  renderPage();
  fillFormFromData(currentData);

  window.addEventListener('pankazlab-data-updated', (event) => {
    if (event.detail) {
      currentData = event.detail;
      renderPage();
      fillFormFromData(currentData);
    }
  });
})();
