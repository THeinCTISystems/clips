import { Component, OnInit, ContentChildren, AfterContentInit, QueryList } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs-container',
  templateUrl: './tabs-container.component.html',
  styleUrls: ['./tabs-container.component.css']
})
export class TabsContainerComponent implements OnInit, AfterContentInit{

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent> = new QueryList()
//  @ContentChildren(TabComponent) tabs?: QueryList<TabComponent> 

  constructor() {}

  ngOnInit(): void {

  }

  ngAfterContentInit(): void {
/*     this.tabs.
    console.log(this.tabs) */
  }
}