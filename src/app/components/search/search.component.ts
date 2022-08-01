import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, Observable } from 'rxjs';
import { AutoComplete } from '../../shared/services/autocomplete.service';
@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
    @Output() newSearchEvent = new EventEmitter<string>();
    searchForm = new FormGroup({
        inputFormControl: new FormControl<string>('', Validators.required),
    });
    autoCompleteNames$!: Observable<string[]>;
    constructor(public _catchInputVal: AutoComplete) {}
    ngOnInit() {
        this.searchForm.controls.inputFormControl.valueChanges
            .pipe(distinctUntilChanged(), debounceTime(500))
            .subscribe((value: any) => {
                this.autoCompleteNames$ =
                    this._catchInputVal.getAutoCompleteArray(value);
            });
    }
    setFindCity(input: any) {
        if (this.searchForm.valid) {
            this.newSearchEvent.emit(input);
        }
    }
}
