import { Component, OnInit, OnDestroy } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable, Subject, takeUntil } from 'rxjs';
import { AutoComplete } from './autocomplete.service';
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit, OnDestroy {
  constructor(private AutoComplete: AutoComplete, public ActivatedRouter: Router) {}

  @Output() newSearchEvent = new EventEmitter<string>();
  autoCompleteNames$!: Observable<string[]>;
  destroy$: Subject<boolean> = new Subject();
  form = new FormGroup({
    inputFormControl: new FormControl<string>('', Validators.required),
  });

  ngOnInit(): void {
    this.form.controls.inputFormControl.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(500), takeUntil(this.destroy$))
      .subscribe((value: string) => {
        this.autoCompleteNames$ = this.AutoComplete.getAutoCompleteArray(value);
      });
  }

  setFindCity(input: string): void {
    if (this.form.valid) {
      this.newSearchEvent.emit(input);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
