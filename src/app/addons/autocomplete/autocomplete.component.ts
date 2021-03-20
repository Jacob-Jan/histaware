import { Component, Input, OnInit, Output, EventEmitter, ViewChild, SimpleChanges, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {

  constructor() { }
  public filteredoptions;
  public lastFilter;
  public showAddButton;
  public error;
  public selectedoptions = new Array();
  public userControl = new FormControl();
  @Input() options: { id, term, selected? }[];
  @Input() placeholder: string;
  @Input() addable: boolean;
  @Input() multiselect: boolean;
  @Input() nofilter: boolean;
  @Input() strings: boolean;
  @Input() disabled: boolean;
  @Input() openPanel: boolean;
  @Input() initialValue: {id, term};
  @Output() selectedoption: EventEmitter<Object> = new EventEmitter<Object>();
  @ViewChild(MatAutocompleteTrigger) inputselect: MatAutocompleteTrigger;
  @ViewChild("input") inputref: ElementRef;

  ngOnInit(): void {
    this.filteredoptions = this.options;
    this.userControl.setValue(this.initialValue)
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.options) {
      this.filteredoptions = changes.options.currentValue;
    }
    if (changes.disabled) {
      changes.disabled.currentValue ? this.userControl.disable() : this.userControl.enable();
    }
    if (changes.openPanel && this.inputselect) {
      if (changes.openPanel.currentValue) {
        this.inputselect.openPanel();
        this.inputref.nativeElement.focus();
      }
    }
    if (changes.initialValue) {
      this.initialValue = changes.initialValue.currentValue;
      this.userControl.setValue(this.initialValue)
    }
  }
  displayFn(o): string {
    let displayValue: string = "";
    if (Array.isArray(o)) {
      o.forEach((o, index) => {
        if (index === 0) {
          displayValue = o.term
        } else {
          displayValue += ', ' + o.term;
        }
      })
    } else if (typeof o === "string" || typeof o === "number") {
      displayValue = o.toString();
    } else {
      displayValue = o ? o.term : undefined;
    }
    return displayValue;
  }

  inputchange(ev, autocomplete) {
    // if (this.multiselect) {
    //   ev.stopPropagation();
    // }
    if (!this.nofilter) {
      let value = ev.target.value;
      this.filteredoptions = this.filter(value);
      if (autocomplete.options.first) {
        autocomplete.options.first.setActiveStyles();
      }
    }
  }

  chooseFirstOption(autocomplete) {
    if (autocomplete.options && !this.multiselect) {
      autocomplete.options.first.select();
    }
  }

  filter(filter: string): {}[] {
    // TODO: improve filter, whole name (firstname lastname) does not match
    this.lastFilter = filter;
    // check if new filter = string else use lastfilter
    var results: { id: any; term: any; selected?: any; add?: boolean }[] = [];
    if (filter) {
      results = this.options.filter(option => {
        return JSON.stringify(option).toLowerCase().indexOf(filter.toLowerCase()) >= 0;
      })
    } else {
      results = this.options.slice();
    }
    if (this.addable) {
      this.showAddButton = !this.options.find(o => o.term === filter);
      if (this.showAddButton) {
        results.push({ id: 0, term: filter, add: true });
      }
    }
    return results
  }

  autocompletevalidator(input) {
    let value = input.value;
    if (this.strings) {
      this.error = false;
    } else if (value.length > 0 && typeof value === 'string') {
      this.error = true;
    } else {
      this.error = false;
    }

  }

  optionselected(ev, option, ischeckbox) {

    if (ischeckbox && this.multiselect) {
      // ev.stopPropagation();
      this.toggleSelection(option);
    } else {
      if (!this.multiselect && !this.strings) {
        this.selectedoption.emit(option.value);
      } else if (this.strings) {
        // this.userControl.setValue(option.value);
        this.selectedoption.emit(option.value);
      }
    }

    this.error = false;
  }
  optiontyped(ev) {
    this.selectedoption.emit(ev);

  }
  toggleSelection(option) {
    option.selected = !option.selected;
    // this.options.find(o => o.id === option.id).selected = option.selected;
    if (option.selected) {
      this.selectedoptions.push(option);
    } else {
      const i = this.selectedoptions.findIndex(value => value.id === option.id);
      this.selectedoptions.splice(i, 1);
    }
    this.userControl.setValue(this.selectedoptions);



    this.selectedoption.emit(this.selectedoptions);
  }
}
