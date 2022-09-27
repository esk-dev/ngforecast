import { Component, OnInit, OnDestroy } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';
import { AutoComplete } from './autocomplete.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  constructor(public _catchInputVal: AutoComplete) {}

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
        this.autoCompleteNames$ =
          this._catchInputVal.getAutoCompleteArray(value);
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
