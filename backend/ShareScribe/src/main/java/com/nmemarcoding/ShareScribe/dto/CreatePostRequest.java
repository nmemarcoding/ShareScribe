package com.nmemarcoding.ShareScribe.dto;

public class CreatePostRequest {
    private String title;
    private String content;
    
    // Constructors
    public CreatePostRequest() {}
    
    public CreatePostRequest(String title, String content) {
        this.title = title;
        this.content = content;
    }
    
    // Getters and setters
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getContent() {
        return content;
    }
    
    public void setContent(String content) {
        this.content = content;
    }
}
