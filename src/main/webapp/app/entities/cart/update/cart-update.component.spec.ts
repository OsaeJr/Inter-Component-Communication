jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CartService } from '../service/cart.service';
import { ICart, Cart } from '../cart.model';

import { CartUpdateComponent } from './cart-update.component';

describe('Component Tests', () => {
  describe('Cart Management Update Component', () => {
    let comp: CartUpdateComponent;
    let fixture: ComponentFixture<CartUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let cartService: CartService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CartUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CartUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CartUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      cartService = TestBed.inject(CartService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const cart: ICart = { id: 'CBA' };

        activatedRoute.data = of({ cart });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(cart));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Cart>>();
        const cart = { id: 'ABC' };
        jest.spyOn(cartService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ cart });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cart }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(cartService.update).toHaveBeenCalledWith(cart);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Cart>>();
        const cart = new Cart();
        jest.spyOn(cartService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ cart });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cart }));
        saveSubject.complete();

        // THEN
        expect(cartService.create).toHaveBeenCalledWith(cart);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Cart>>();
        const cart = { id: 'ABC' };
        jest.spyOn(cartService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ cart });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(cartService.update).toHaveBeenCalledWith(cart);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
