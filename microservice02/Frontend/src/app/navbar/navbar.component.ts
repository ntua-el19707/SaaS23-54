import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Routes } from './routes';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  private routes: Routes[] = []; // routes table 
  private title: string = "charti";//title
  /**
   * constructor
   * @param breakpointObserver 
   */
  constructor(private breakpointObserver: BreakpointObserver) {
  }
  /**
   * function - ngOnInit()
   */
  ngOnInit(): void {
    this.routes = [{ display: 'Home', path: '/' }]
  }
  //* get Routes  
  /**
   * function - getRoutes() 
   * @return array of Routes
   */
  public getRoutes(): Routes[] {
    return this.routes;
  }
  //* get Title
  /**
   * function - getTitle()
   * @return title string
   */
  public getTitle(): string {
    return this.title;
  }
}
