package com.nmemarcoding.ShareScribe.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nmemarcoding.ShareScribe.dto.PostDto;
import com.nmemarcoding.ShareScribe.dto.CreatePostRequest;
import com.nmemarcoding.ShareScribe.model.Post;
import com.nmemarcoding.ShareScribe.model.User;
import com.nmemarcoding.ShareScribe.repository.PostRepository;
import com.nmemarcoding.ShareScribe.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    /**
     * Creates a new post for a user
     * @param userId The ID of the user creating the post
     * @param request The post creation request containing title and content
     * @return DTO with the created post details
     */
    @Transactional
    public PostDto createPost(Long userId, CreatePostRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Post post = new Post();
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        post.setAuthor(user);
        post.setAuthorId(user.getUserId()); // Explicitly set authorId to match the user
        // createdAt and updatedAt are set automatically by @PrePersist
        
        Post savedPost = postRepository.save(post);
        
        return convertToDto(savedPost);
    }
    
    /**
     * Get all posts by a specific user
     * @param userId The ID of the user
     * @return List of post DTOs
     */
    public List<PostDto> getPostsByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        return postRepository.findByAuthorOrderByCreatedAtDesc(user)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    /**
     * Get all posts in the system
     * @return List of all post DTOs
     */
    public List<PostDto> getAllPosts() {
        return postRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    /**
     * Delete a post by its ID
     * @param postId The ID of the post to delete
     * @param userId The ID of the user attempting to delete the post (for authorization)
     * @return true if the post was successfully deleted, false otherwise
     * @throws RuntimeException if the post doesn't exist or the user is not authorized
     */
    @Transactional
    public boolean deletePost(Long postId, Long userId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + postId));
        
        // Verify that the user is the author of the post
        if (!post.getAuthor().getUserId().equals(userId)) {
            throw new RuntimeException("User is not authorized to delete this post");
        }
        
        postRepository.delete(post);
        return true;
    }
    
    /**
     * Convert Post entity to PostDto
     * @param post The post entity
     * @return PostDto object
     */
    private PostDto convertToDto(Post post) {
        PostDto dto = new PostDto();
        dto.setId(post.getId());
        dto.setTitle(post.getTitle());
        dto.setContent(post.getContent());
        // We no longer include authorId in the DTO for security reasons
        dto.setAuthorUsername(post.getAuthor().getUsername());
        dto.setCreatedAt(post.getCreatedAt());
        dto.setUpdatedAt(post.getUpdatedAt());
        return dto;
    }
}
