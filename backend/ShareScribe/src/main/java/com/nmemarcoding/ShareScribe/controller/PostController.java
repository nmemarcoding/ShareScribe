package com.nmemarcoding.ShareScribe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nmemarcoding.ShareScribe.dto.CreatePostRequest;
import com.nmemarcoding.ShareScribe.dto.PostDto;
import com.nmemarcoding.ShareScribe.model.User;
import com.nmemarcoding.ShareScribe.service.PostService;
import com.nmemarcoding.ShareScribe.service.UserService;
import com.nmemarcoding.ShareScribe.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    /**
     * Create a new post
     * @param request The post creation request with title and content
     * @return The created post details
     */
    @PostMapping
    public ResponseEntity<?> createPost(@RequestBody CreatePostRequest request, HttpServletRequest httpRequest) {
        try {
            // Validate token and get username
            jwtUtil.requireValidToken(httpRequest);
            String username = jwtUtil.extractUsernameFromRequest(httpRequest);
            
            Optional<User> userOpt = userService.findByUsername(username);
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
            }
            
            PostDto createdPost = postService.createPost(userOpt.get().getUserId(), request);
            return new ResponseEntity<>(createdPost, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed: " + e.getMessage());
        }
    }
    
    /**
     * Get all posts for the authenticated user
     * @return List of posts
     */
    @GetMapping("/my-posts")
    public ResponseEntity<?> getMyPosts(HttpServletRequest httpRequest) {
        try {
            // Validate token and get username
            jwtUtil.requireValidToken(httpRequest);
            String username = jwtUtil.extractUsernameFromRequest(httpRequest);
            
            Optional<User> userOpt = userService.findByUsername(username);
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
            }
            
            List<PostDto> posts = postService.getPostsByUser(userOpt.get().getUserId());
            return ResponseEntity.ok(posts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed: " + e.getMessage());
        }
    }
    
    /**
     * Get all posts for a specific user
     * @param userId The ID of the user
     * @return List of posts
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getPostsByUser(@PathVariable Long userId, HttpServletRequest httpRequest) {
        try {
            // Validate token
            jwtUtil.requireValidToken(httpRequest);
            
            List<PostDto> posts = postService.getPostsByUser(userId);
            return ResponseEntity.ok(posts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed: " + e.getMessage());
        }
    }
    
    /**
     * Get all posts
     * @return List of all posts
     */
    @GetMapping
    public ResponseEntity<?> getAllPosts(HttpServletRequest httpRequest) {
        try {
            // Validate token
            jwtUtil.requireValidToken(httpRequest);
            
            List<PostDto> posts = postService.getAllPosts();
            return ResponseEntity.ok(posts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed: " + e.getMessage());
        }
    }
    
    /**
     * Delete a post by its ID
     * @param postId The ID of the post to delete
     * @return Success message if deleted, error message otherwise
     */
    @DeleteMapping("/{postId}")
    public ResponseEntity<?> deletePost(@PathVariable Long postId, HttpServletRequest httpRequest) {
        try {
            // Validate token and get username
            jwtUtil.requireValidToken(httpRequest);
            String username = jwtUtil.extractUsernameFromRequest(httpRequest);
            
            Optional<User> userOpt = userService.findByUsername(username);
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
            }
            
            // Try to delete the post
            boolean deleted = postService.deletePost(postId, userOpt.get().getUserId());
            
            if (deleted) {
                return ResponseEntity.ok("Post deleted successfully");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete post");
            }
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed: " + e.getMessage());
        }
    }
    
}
