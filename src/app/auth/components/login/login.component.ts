import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '../../store/selectors';
import {LoginRequestInterface} from '../../types/loginRequest.interface';
import {loginAction} from '../../store/actions/login.action';
import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface';

@Component({
  selector: 'app-mc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface | null>;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      email: '',
      password: '',
    });
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  onSubmit(): void {
    const request: LoginRequestInterface = {
      // @ts-ignore
      user: this.form.value,
    };
    this.store.dispatch(loginAction({request}));
  }
}
