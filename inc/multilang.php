<?php

function lang_support() {
    return array('vi', 'en'); // Add your support lang-code (1st place is a default)
}

function rewrite_lang() {
    $langs = lang_support();
    foreach ($langs as $lang) {
        add_rewrite_endpoint($lang, EP_ALL);
    }
}

add_action('init', 'rewrite_lang');

function lang() {
    global $wp_query;
    $langs = lang_support();
    $lang_r = "";
    foreach ($langs as $lang) {
        var_dump($_GET);
        if (isset($wp_query->query_vars[$lang])) {
            $lang_r = $lang;
            $_SESSION['lang'] = $lang_r;
        }
    }
    if (in_array($lang_r, $langs)) {
        return $lang_r;
    } else {
        return $langs[0];
    }
}

function init_session() {
    session_start();
}

add_action('init', 'init_session', 1);

function lang_session() { // Redirect by JS if session is set
    $url_lang = basename($_SERVER['REQUEST_URI']);
    if (!in_array($url_lang, lang_support()) && isset($_SESSION['lang'])) {
        if (!is_404()) {
            wp_redirect(currentURL() . $_SESSION['lang'], 301);
            exit;
        }
    }
}

add_action('wp_head', 'lang_session');

function output_buffer() {
    ob_start();
}

add_action('init', 'output_buffer');

function currentURL() {
    $pageURL = (@$_SERVER["HTTPS"] == "on") ? "https://" : "http://";
    if ($_SERVER["SERVER_PORT"] != "80") {
        $pageURL.=$_SERVER["SERVER_NAME"] . ":" . $_SERVER["SERVER_PORT"] . $_SERVER["REQUEST_URI"];
    } else {
        $pageURL.=$_SERVER["SERVER_NAME"] . $_SERVER["REQUEST_URI"];
    }
    return $pageURL;
}
