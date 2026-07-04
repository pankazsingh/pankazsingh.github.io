(function (global) {
  const STORAGE_KEY = 'pankazlab-site-data';

  const DEFAULT_DATA = {
    siteTitle: 'PankazLab',
    profile: {
      name: 'Dr. Pankaj Singh Dholaniya',
      position: 'Assistant Professor',
      affiliationLines: [
        'Department of Biotechnology & Bioinformatics',
        'School of Life Sciences',
        'University of Hyderabad',
      ],
      credentials: 'Ph.D., M.Tech., B.Tech.',
      email: 'pankaz@uohyd.ac.in',
      scholarUrl: 'https://scholar.google.com/citations?user=h_tFfq8AAAAJ&hl=en',
      linkedinUrl: 'https://www.linkedin.com/in/pankaj-singh-dholaniya-ph-d-174b3914/',
      profileImage: './assets/profile.jpg',
      logoImage: './assets/logo.svg',
    },
    hero: {
      eyebrow: 'Research profile',
      headline: 'PankazLab',
      lead:
        'Dr. Pankaj Singh Dholaniya is an interdisciplinary researcher working across computational biology, AI-driven bioinformatics, and translational biomedical science.',
      summary:
        'His work centers on machine learning, regulatory network modeling, and single-cell and bulk multi-omics analysis to study cardiovascular and neurodegenerative disease systems, especially myocardial injury and Parkinson’s disease.',
    },
    stats: [
      'Computational biology',
      'AI-driven bioinformatics',
      'Multi-omics analysis',
      'Cardio + neuro disease systems',
    ],
    about: [
      'Dr. Dholaniya combines computational and experimental approaches to identify biomarkers, uncover disease-associated molecular mechanisms, and develop interpretable frameworks that support precision medicine.',
      'The profile emphasizes work in single-cell and bulk multi-omics, machine learning, and regulatory biology across cardiovascular injury, myocardial recovery, Parkinson’s disease, and broader neurodegeneration.',
    ],
    quickLinks: [
      {
        label: 'Word profile',
        href: '../Profile/Pankaj_Singh_Dholaniya_Research_Profile.docx',
      },
      {
        label: 'Full CV',
        href: '../Profile/Pankaj_Singh_CV_Full.docx',
      },
    ],
    themes: [
      {
        title: 'Machine learning and network biology',
        description:
          'Interpretable prediction, feature selection, and regulatory network modeling for complex biological systems.',
      },
      {
        title: 'Neurodegeneration',
        description:
          'Parkinson’s disease, neuronal senescence, gene prioritization, and pathway-level analysis.',
      },
      {
        title: 'Cardiovascular disease biology',
        description:
          'Myocardial injury, recovery, cardiomyocyte biology, and therapeutic protection strategies.',
      },
      {
        title: 'Multi-omics analysis',
        description:
          'Single-cell and bulk data integration to surface disease signatures, biomarkers, and mechanistic patterns.',
      },
    ],
    publications: [
      {
        id: 'pub-1',
        featured: true,
        year: '2026',
        title:
          'Transcriptional remodeling of cardiomyocytes and fibroblasts during post-myocardial infarction recovery',
        venue: 'Scientific Reports, 16, 12120.',
        doi: '10.1038/s41598-026-41631-y',
        url: 'https://doi.org/10.1038/s41598-026-41631-y',
      },
      {
        id: 'pub-2',
        featured: true,
        year: '2026',
        title: 'Identification of genes associated with smell dysfunction in Parkinson’s disease',
        venue: 'Clinical Parkinsonism & Related Disorders, 100453.',
        doi: '10.1016/j.prdoa.2026.100453',
        url: 'https://doi.org/10.1016/j.prdoa.2026.100453',
      },
      {
        id: 'pub-3',
        featured: true,
        year: '2025',
        title:
          'SiRNA-mediated knockdown of TOP2B protects hiPSC-derived cardiomyocytes from doxorubicin-induced toxicity',
        venue: 'Life Sciences, 371, 123595.',
        doi: '10.1016/j.lfs.2025.123595',
        url: 'https://doi.org/10.1016/j.lfs.2025.123595',
      },
      {
        id: 'pub-4',
        featured: true,
        year: '2022',
        title:
          'Oxidative phosphorylation mediated pathogenesis of Parkinson’s disease and its implication via Akt signaling',
        venue: 'Neurochemistry International, 152, 105344.',
        doi: '10.1016/j.neuint.2022.105344',
        url: 'https://doi.org/10.1016/j.neuint.2022.105344',
      },
      {
        id: 'pub-5',
        featured: true,
        year: '2024',
        title:
          'Augmenting tomato functional genomics with a genome-wide induced genetic variation resource',
        venue: 'Frontiers in Plant Science, 14, 1290937.',
        doi: '10.3389/fpls.2023.1290937',
        url: 'https://doi.org/10.3389/fpls.2023.1290937',
      },
      {
        id: 'pub-6',
        featured: true,
        year: '2022',
        title:
          "Parkinson's disease gene prioritising using an efficient and biologically appropriate network-based consensus strategy",
        venue: 'Journal of Computational Science, 65, 101879.',
        doi: '10.1016/j.jocs.2022.101879',
        url: 'https://doi.org/10.1016/j.jocs.2022.101879',
      },
      {
        id: 'pub-7',
        featured: true,
        year: '2021',
        title: 'The Prevailing Role of Topoisomerase 2 Beta and its Associated Genes in Neurons',
        venue: 'Molecular Neurobiology, 58, 6443-6459.',
        doi: '10.1007/s12035-021-02561-0',
        url: 'https://doi.org/10.1007/s12035-021-02561-0',
      },
      {
        id: 'pub-8',
        featured: false,
        year: '2020',
        title:
          'Reanalysis of genome sequences of tomato accessions and its wild relatives: development of Tomato Genomic Variation (TGV) database integrating SNPs and INDELs polymorphisms',
        venue: 'Bioinformatics, 36, 4984-4990.',
        doi: '10.1093/bioinformatics/btaa617',
        url: 'https://doi.org/10.1093/bioinformatics/btaa617',
      },
      {
        id: 'pub-9',
        featured: false,
        year: '2020',
        title:
          'Analysis of multiple transcriptome data to determine age-associated genes for the progression of Parkinson’s disease',
        venue: 'Meta Gene, 25, 100712.',
        doi: '10.1016/j.mgene.2020.100712',
        url: 'https://doi.org/10.1016/j.mgene.2020.100712',
      },
      {
        id: 'pub-10',
        featured: false,
        year: '2015',
        title:
          'A knowledge driven supervised learning approach to identify gene network of differentially up-regulated genes during neuronal senescence in Rattus norvegicus',
        venue: 'Biosystems, 135, 9-14.',
        doi: '10.1016/j.biosystems.2015.07.002',
        url: 'https://doi.org/10.1016/j.biosystems.2015.07.002',
      },
    ],
    labMembers: [
      {
        id: 'member-1',
        name: 'Dr. Pankaj Singh Dholaniya',
        role: 'Principal Investigator',
        affiliation: 'University of Hyderabad',
        expertise: 'Computational biology, AI bioinformatics, and translational disease modeling',
        email: 'pankaz@uohyd.ac.in',
        status: 'current',
        visible: true,
      },
    ],
  };

  function cloneDefaultData() {
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }

  function isPlainObject(value) {
    return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
  }

  function mergeData(baseValue, overrideValue) {
    if (Array.isArray(baseValue)) {
      return Array.isArray(overrideValue) ? overrideValue : JSON.parse(JSON.stringify(baseValue));
    }

    if (isPlainObject(baseValue)) {
      const result = {};
      const overrideObject = isPlainObject(overrideValue) ? overrideValue : {};
      for (const key of Object.keys(baseValue)) {
        result[key] = mergeData(baseValue[key], overrideObject[key]);
      }
      for (const key of Object.keys(overrideObject)) {
        if (!(key in result)) {
          result[key] = overrideObject[key];
        }
      }
      return result;
    }

    return overrideValue !== undefined ? overrideValue : baseValue;
  }

  function loadSiteData() {
    try {
      const raw = global.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return cloneDefaultData();
      }
      return mergeData(DEFAULT_DATA, JSON.parse(raw));
    } catch (_error) {
      return cloneDefaultData();
    }
  }

  function saveSiteData(data) {
    const payload = JSON.stringify(data);
    global.localStorage.setItem(STORAGE_KEY, payload);
    global.dispatchEvent(new CustomEvent('pankazlab-data-updated', { detail: data }));
  }

  function resetSiteData() {
    global.localStorage.removeItem(STORAGE_KEY);
    const fresh = cloneDefaultData();
    global.dispatchEvent(new CustomEvent('pankazlab-data-updated', { detail: fresh }));
    return fresh;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function publicationUrlFromDoi(doi) {
    const clean = String(doi || '').trim();
    if (!clean) {
      return '#';
    }
    if (clean.startsWith('http://') || clean.startsWith('https://')) {
      return clean;
    }
    return `https://doi.org/${clean}`;
  }

  global.PankazLabData = {
    STORAGE_KEY,
    DEFAULT_DATA,
    cloneDefaultData,
    loadSiteData,
    saveSiteData,
    resetSiteData,
    mergeData,
    escapeHtml,
    publicationUrlFromDoi,
  };
})(window);
