package com.nmemarcoding.ShareScribe.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nmemarcoding.ShareScribe.model.User;



public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
}