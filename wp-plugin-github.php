<?php
/**
 * Plugin Name: Github-shortcode-content
 * Plugin URI: https://www.wpwebdevelopment.com
 * Description: Display content using a shortcode to insert in a page or post
 * Version: 1.0 TODO separate html css and js then include them in main file
 * Text Domain: github-shortcode-content
 * Author: Gary Matthew Payne
 * Author URI: https://www.wpwebdevelopment.com
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

// Includes
include( 'includes/api-func.php' );
include( 'enqueue-scripts.php');
	
// Hooks
add_action( 'wp_enqueue_scripts', 'github_shortcode_content_enqueue_scripts');

// Register shortcode
add_shortcode('wp_plugin_github', 'wp_plugin_github_function'); 


?>