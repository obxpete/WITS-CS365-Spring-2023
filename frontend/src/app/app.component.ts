import { Component , OnInit, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup,  Validators,  FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select'
// update imports here
import { MatTable, MatTableDataSource} from '@angular/material/table';
import { MatFormField} from '@angular/material/form-field';
import { MatDatepicker } from '@angular/material/datepicker'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = ' My WITS 365 App';

  //paginator viewchild here
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ELEMENT_DATA: task[] = [{
    'taskID': 0,
    'task': '',
    'taskDueDate': ''
  }]

  // MAT TABLE
  displayedColumns: string[] = ['taskID', 'task'];
  dataSource = new MatTableDataSource<task>(this.ELEMENT_DATA);
 

  taskForm : FormGroup;
  // initialize taskUpdate form here
  taskUpdateForm : FormGroup;
  taskData:object[];
    
  
  constructor(private http: HttpClient,private formBuilder: FormBuilder) {
    //basic angular form
    this.taskForm = this.formBuilder.group({
      newTask: this.formBuilder.control(''),
      newTaskDueDate: this.formBuilder.control('')
    })

    //Insert updateTask form here
    this.taskUpdateForm = this.formBuilder.group({
      existingTaskID: this.formBuilder.control(0),
      existingTask: this.formBuilder.control(''),
      existingTaskDueDate: this.formBuilder.control('')
    })
  }

  // ngOnInit runs when the component loads
  ngOnInit(): void {
    this.getTasks();
  }
  
  //ngAfterViewInit here
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getTasks() {
    this.http.get<[]>('https://obxpete-wits-365-summer-5782-project-rrx7w54w625675-8090.preview.app.github.dev/api/tasks').subscribe(data => {
      this.taskData = data;
      this.ELEMENT_DATA = data['recordset'].map(task => {return {taskID: task.taskID, task: task.task, taskDueDate: task.taskDueDate}})
      this.dataSource = new MatTableDataSource<task>(this.ELEMENT_DATA);
    })  
  }

  addNewTask() {
    // this.taskData.push({task:this.taskForm.get('newTask').value});
    this.http.post<any>('https://obxpete-wits-365-summer-5782-project-rrx7w54w625675-8090.preview.app.github.dev/api/add', {task:this.taskForm.get('newTask').value, taskDueDate: new Date(this.taskForm.get('newTaskDueDate').value).toDateString() }).subscribe(data => {
      // insert getTasks() call to update our table
      this.getTasks();
    });
    
    this.taskForm.get('newTask').reset() // i am here and here
  }
  
  // add updateTask function here
  
  updateTask() {
    this.http.post<any>('https://obxpete-wits-365-summer-5782-project-rrx7w54w625675-8090.preview.app.github.dev/api/update', {taskID: this.taskUpdateForm.controls['existingTaskID'].value ,  task:this.taskUpdateForm.controls['existingTask'].value, taskDueDate: this.taskUpdateForm.controls['existingTaskDueDate'].value}).subscribe(data => {
      // insert getTasks() call to update our table
      this.getTasks();
      this.taskUpdateForm.reset()
    });
  }

  // add delete task function here
  delete(taskID) {
    this.http.get<[]>(`https://obxpete-wits-365-summer-5782-project-rrx7w54w625675-8090.preview.app.github.dev:8090/api/delete/${taskID}`).subscribe(data => {
      this.getTasks()
    })  
  }
  taskSelectionChange(e)
  {
    console.log(e)
  }
}


export interface task {
  taskID: number;
  task: string;
  taskDueDate: string;
}