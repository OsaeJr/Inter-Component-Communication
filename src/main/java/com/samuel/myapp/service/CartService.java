package com.samuel.myapp.service;

import com.samuel.myapp.domain.Cart;
import com.samuel.myapp.repository.CartRepository;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link Cart}.
 */
@Service
public class CartService {

    private final Logger log = LoggerFactory.getLogger(CartService.class);

    private final CartRepository cartRepository;

    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    /**
     * Save a cart.
     *
     * @param cart the entity to save.
     * @return the persisted entity.
     */
    public Cart save(Cart cart) {
        log.debug("Request to save Cart : {}", cart);
        return cartRepository.save(cart);
    }

    /**
     * Partially update a cart.
     *
     * @param cart the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Cart> partialUpdate(Cart cart) {
        log.debug("Request to partially update Cart : {}", cart);

        return cartRepository
            .findById(cart.getId())
            .map(
                existingCart -> {
                    if (cart.getName() != null) {
                        existingCart.setName(cart.getName());
                    }
                    if (cart.getDescription() != null) {
                        existingCart.setDescription(cart.getDescription());
                    }
                    if (cart.getPrice() != null) {
                        existingCart.setPrice(cart.getPrice());
                    }

                    return existingCart;
                }
            )
            .map(cartRepository::save);
    }

    /**
     * Get all the carts.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    public Page<Cart> findAll(Pageable pageable) {
        log.debug("Request to get all Carts");
        return cartRepository.findAll(pageable);
    }

    /**
     * Get one cart by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Optional<Cart> findOne(String id) {
        log.debug("Request to get Cart : {}", id);
        return cartRepository.findById(id);
    }

    /**
     * Delete the cart by id.
     *
     * @param id the id of the entity.
     */
    public void delete(String id) {
        log.debug("Request to delete Cart : {}", id);
        cartRepository.deleteById(id);
    }
}
