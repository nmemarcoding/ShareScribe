package com.nmemarcoding.ShareScribe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nmemarcoding.ShareScribe.model.Post;
import com.nmemarcoding.ShareScribe.model.User;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByAuthor(User author);
    List<Post> findByAuthorOrderByCreatedAtDesc(User author);
}
