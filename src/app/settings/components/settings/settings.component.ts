import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';
import {currentUserSelector} from '../../../auth/store/selectors';
import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface';
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '../../store/selectors';
import {updateCurrentUserAction} from '../../../auth/store/actions/updateCurrentUser.action';
import {CurrentUserInputInterface} from '../../../shared/types/currentUserInput.interface';
import {logout} from '../../../auth/store/actions/sync.action';

@Component({
  selector: 'app-mc-settings',
  templateUrl: 'settings.component.html',
})
export class SettingsComponent implements OnInit, OnDestroy {
  currentUser: CurrentUserInterface;
  currentUserSubscription: Subscription;
  form: FormGroup;

  isSubmitting$: Observable<boolean>;
  errors$: Observable<BackendErrorsInterface | null>;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeListeners();
    this.initializeValues();
  }

  initializeListeners(): void {
    this.currentUserSubscription = this.store
      .pipe(select(currentUserSelector), filter(Boolean))
      .subscribe((currentUser: CurrentUserInterface) => {
        this.currentUser = currentUser;
        this.initializeForm();
      });
  }

  initializeForm(): void {
    this.form = this.fb.group({
      image: this.currentUser.image,
      username: this.currentUser.username,
      bio: this.currentUser.bio,
      email: this.currentUser.email,
      password: '',
    });
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.errors$ = this.store.pipe(select(validationErrorsSelector));
  }

  onSubmit(): void {
    const currentUserInput: CurrentUserInputInterface = {
      ...this.currentUser,
      ...this.form.value,
    };
    this.store.dispatch(updateCurrentUserAction({currentUserInput}));
  }

  logout(): void {
    this.store.dispatch(logout());
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }
}
