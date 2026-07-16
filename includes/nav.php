<?php require_once __DIR__ . "/config.php"; ?>
<nav class="nav-shell" data-nav>
  <a class="brand" href="<?= $site['base'] ?>/index.html" aria-label="Home">
    <span class="brand-mark">YG</span>
    <span><strong><?= $site['team'] ?></strong><small>iGEM <?= $site['year'] ?></small></span>
  </a>
  <button class="icon-button nav-toggle" data-nav-toggle aria-label="Open menu"><span></span><span></span></button>
  <div class="nav-links" data-nav-menu>
    <a href="<?= $site['base'] ?>/pages/description.html">Project</a>
    <a href="<?= $site['base'] ?>/pages/engineering.html">Engineering</a>
    <a href="<?= $site['base'] ?>/pages/results.html">Results</a>
    <a href="<?= $site['base'] ?>/pages/model.html">Model</a>
    <a href="<?= $site['base'] ?>/pages/safety.html">Safety</a>
    <a href="<?= $site['base'] ?>/pages/human-practices.html">Human Practices</a>
    <a href="<?= $site['base'] ?>/pages/team.html">Team</a>
  </div>
  <button class="icon-button" data-theme-toggle aria-label="Toggle theme">◐</button>
</nav>
