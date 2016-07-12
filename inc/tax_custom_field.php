<?php

if (!class_exists('Tax_Meta_Class')) {
    include( get_template_directory() . '/inc/lib/Tax-meta-class/Tax-meta-class.php' );
}

$sixei_cat_headline_field_config = array(
   'id' => 'sixei_cat_headline',                         // meta box id, unique per meta box
   'title' => 'English',                      // meta box title
   'pages' => array('category'),                    // taxonomy name, accept categories, post_tag and custom taxonomies
   'context' => 'normal',                           // where the meta box appear: normal (default), advanced, side; optional
   'fields' => array(),                             // list of meta fields (can be added by field arrays)
   'local_images' => false,                         // Use local or hosted images (meta box images for add/remove)
   'use_with_theme' => false                        //change path if used with theme set to true, false for a plugin or anything else for a custom path(default false).
);
 
/*
* Initiate your taxonomy custom fields
*/
 
$sixei_cat_headline_meta = new Tax_Meta_Class($sixei_cat_headline_field_config);
 
 
/*
* Add fields 
*/
 
//text field
$sixei_cat_headline_meta->addText('sixei_name_en',array('name'=> 'English name'));
//Finish Taxonomy Extra fields Deceleration
$sixei_cat_headline_meta->Finish();