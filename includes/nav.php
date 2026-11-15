<?php require_once __DIR__ . "/config.php"; ?>
<nav class="nav-shell" data-nav>
  <a class="brand" href="<?= $site['base'] ?>/index.html" aria-label="Wiki 首页">
    <span class="brand-mark">启</span>
    <span><strong><?= $site['team'] ?></strong><small>iGEM <?= $site['year'] ?></small></span>
  </a>
  <button class="icon-button nav-toggle" data-nav-toggle aria-label="打开菜单"><span></span><span></span></button>
  <div class="nav-links" data-nav-menu>
    <a href="<?= $site['base'] ?>/pages/description.html">描述</a>
    <a href="<?= $site['base'] ?>/pages/engineering.html">工程</a>
    <a href="<?= $site['base'] ?>/pages/results.html">结果</a>
    <a href="<?= $site['base'] ?>/pages/model.html">建模</a>
    <a href="<?= $site['base'] ?>/pages/safety.html">安全</a>
    <a href="<?= $site['base'] ?>/pages/human-practices.html">实践</a>
    <a href="<?= $site['base'] ?>/pages/team.html">团队</a>
    <a href="<?= $site['base'] ?>/pages/components.html">插件</a>
  </div>
  <a class="nav-back" href="<?= $site['library'] ?>">← 插件库</a>
  <button class="icon-button" data-theme-toggle aria-label="切换明暗主题">◐</button>
</nav>
