package com.samuel.myapp.repository;

import com.samuel.myapp.domain.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Cart entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CartRepository extends MongoRepository<Cart, String> {}
