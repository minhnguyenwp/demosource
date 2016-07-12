<?php
/**
 Admin Page Framework v3.5.10 by Michael Uno
 Generated by PHP Class Files Script Generator <https://github.com/michaeluno/PHP-Class-Files-Script-Generator>
 <http://en.michaeluno.jp/admin-page-framework>
 Copyright (c) 2013-2015, Michael Uno; Licensed under MIT <http://opensource.org/licenses/MIT>
 */
abstract class AdminPageFramework_Utility_Path extends AdminPageFramework_Utility_Array {
    static public function getRelativePath($from, $to) {
        $from = is_dir($from) ? rtrim($from, '\/') . '/' : $from;
        $to = is_dir($to) ? rtrim($to, '\/') . '/' : $to;
        $from = str_replace('\\', '/', $from);
        $to = str_replace('\\', '/', $to);
        $from = explode('/', $from);
        $to = explode('/', $to);
        $relPath = $to;
        foreach ($from as $depth => $dir) {
            if ($dir === $to[$depth]) {
                array_shift($relPath);
            } else {
                $remaining = count($from) - $depth;
                if ($remaining > 1) {
                    $padLength = (count($relPath) + $remaining - 1) * -1;
                    $relPath = array_pad($relPath, $padLength, '..');
                    break;
                } else {
                    $relPath[0] = './' . $relPath[0];
                }
            }
        }
        return implode('/', $relPath);
    }
    static public function getCallerScriptPath($asRedirectedFiles = array(__FILE__)) {
        $aRedirectedFiles = ( array )$asRedirectedFiles;
        $aRedirectedFiles[] = __FILE__;
        $_sCallerFilePath = '';
        foreach (debug_backtrace() as $aDebugInfo) {
            $_sCallerFilePath = $aDebugInfo['file'];
            if (in_array($_sCallerFilePath, $aRedirectedFiles)) {
                continue;
            }
            break;
        }
        return $_sCallerFilePath;
    }
}