#include <iostream>
#include <stdlib.h>
#include <GL/glut.h>
#include<windows.h>
#include<stdio.h>
#include<conio.h>
#include<cmath>

using namespace std;


GLdouble A, B, C, D;  
const int screenWidth= 1400; 
const int screenHeight= 800; 
 static float _angle= -70.0f;

    void  my_init(){
    glClearColor(1.0, 1.0, 1.0, 0.0); 
    glColor3f(0.0f, 0.0f , 0.0f);
    glPointSize(2.0); 
     glEnable(GL_DEPTH_TEST);

     glEnable( GL_TEXTURE_2D );
    glMatrixMode(GL_PROJECTION); 
    glLoadIdentity(); 
    gluOrtho2D(0.0, (GLdouble)screenWidth, 0.0, (GLdouble)screenHeight);
    A= screenWidth / 20.0; 
    B = 0.0; 
    C = D = screenHeight / 2.0;  

    }

 class Shape{
     private:
             GLfloat x, y, z; 
             
     public: 
             Shape(){

             	glutInitDisplayMode(GLUT_DOUBLE | GLUT_RGB | GLUT_DEPTH);
              glutInitWindowSize(screenWidth, screenHeight);
           glutCreateWindow("VISUAL-3D");
           glClearColor(1.0f, 0.0f, 1.0f, 1.0f);
                     
                     }
                     
            void initRendering() {
        glEnable(GL_DEPTH_TEST);
        glEnable(GL_LIGHTING);
        glEnable(GL_LIGHT0);
        glEnable(GL_NORMALIZE);
         glEnable(GL_DEPTH_TEST);

   glEnable( GL_TEXTURE_2D );
        glEnable(GL_COLOR_MATERIAL);
        glClearColor(0.1f,0.0f,0.1f,0.1f);
         
         }
         
  

     static void handleKeypress(unsigned char key, int x, int y) {
          switch (key) {
              case 27: 
            exit(0);
   
              
   }
   	
}

  
           static void handleResize(int w, int h) {
       const float ar = (float) w / (float) h; 
       
           glViewport(0, 0, w, h);
       glMatrixMode(GL_PROJECTION);
       glLoadIdentity();
       glFrustum(-ar, ar, -1.0, 1.0, 2.0, 100.0);
       glMatrixMode(GL_MODELVIEW);
       gluPerspective(45.0, (float)w / (float)h, 1.0, 200.0);
           glLoadIdentity() ; 
                                       }
           
           static void update(int value) {
           	
               _angle += 1.5;
         if ( _angle > 360) {
              _angle -=360;
            }
           glutPostRedisplay();
           	glutTimerFunc(15, Shape::update, 0);
            }
                                        
            
     };
class cube:public Shape{
     public:
            static  void drawScenecube() {
    
    float BOX_SIZE = 4.3f;
glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

glMatrixMode(GL_MODELVIEW);
glLoadIdentity();

glTranslatef(0.0f, 0.0f, -30.0f);

GLfloat ambientLight[] = {0.3f, 0.3f, 0.3f, 1.0f};
glLightModelfv(GL_LIGHT_MODEL_AMBIENT, ambientLight);

GLfloat lightColor[] = {0.7f, 0.7f, 0.7f, 1.0f};
GLfloat lightPos[] = {-2 * BOX_SIZE, BOX_SIZE, 4 * BOX_SIZE, 1.0f};
glLightfv(GL_LIGHT0, GL_DIFFUSE, lightColor);
glLightfv(GL_LIGHT0, GL_POSITION, lightPos);

glRotatef(_angle, 1.0f, 1.0f, -1.6f);
glPushMatrix();
glBegin(GL_QUADS);

//Top face
glColor3f(1.0f, 1.0f, 0.0f);
glNormal3f(0.0, 1.0f, 0.0f);
glVertex3f(-BOX_SIZE / 2, BOX_SIZE / 2, -BOX_SIZE / 2);
glVertex3f(-BOX_SIZE / 2, BOX_SIZE / 2, BOX_SIZE / 2);
glVertex3f(BOX_SIZE / 2, BOX_SIZE / 2, BOX_SIZE / 2);
glVertex3f(BOX_SIZE / 2, BOX_SIZE / 2, -BOX_SIZE / 2);

//Bottom face
   glColor3f(1.0f, 1.0f, 0.0f);
glNormal3f(0.0, -1.0f, 0.0f);
glVertex3f(-BOX_SIZE / 2, -BOX_SIZE / 2, -BOX_SIZE / 2);
glVertex3f(BOX_SIZE / 2, -BOX_SIZE / 2, -BOX_SIZE / 2);
glVertex3f(BOX_SIZE / 2, -BOX_SIZE / 2, BOX_SIZE / 2);
glVertex3f(-BOX_SIZE / 2, -BOX_SIZE / 2, BOX_SIZE / 2);

//Left face
glNormal3f(-1.0, 0.0f, 0.0f);
glColor3f(1.0f, 1.0f, 0.0f);
glVertex3f(-BOX_SIZE / 2, -BOX_SIZE / 2, -BOX_SIZE / 2);
glVertex3f(-BOX_SIZE / 2, -BOX_SIZE / 2, BOX_SIZE / 2);
glVertex3f(-BOX_SIZE / 2, BOX_SIZE / 2, BOX_SIZE / 2);
glVertex3f(-BOX_SIZE / 2, BOX_SIZE / 2, -BOX_SIZE / 2);

//Right face
glNormal3f(1.0, 0.0f, 0.0f);
glColor3f(1.0f, 1.0f, 0.0f);
glVertex3f(BOX_SIZE / 2, -BOX_SIZE / 2, -BOX_SIZE / 2);
glVertex3f(BOX_SIZE / 2, BOX_SIZE / 2, -BOX_SIZE / 2);
glVertex3f(BOX_SIZE / 2, BOX_SIZE / 2, BOX_SIZE / 2);
glVertex3f(BOX_SIZE / 2, -BOX_SIZE / 2, BOX_SIZE / 2);

glEnd();


glBegin(GL_QUADS);

//Front face
glNormal3f(0.0, 0.0f, 1.0f);
glVertex3f(-BOX_SIZE / 2, -BOX_SIZE / 2, BOX_SIZE / 2);
glVertex3f(BOX_SIZE / 2, -BOX_SIZE / 2, BOX_SIZE / 2);
glVertex3f(BOX_SIZE / 2, BOX_SIZE / 2, BOX_SIZE / 2);
glVertex3f(-BOX_SIZE / 2, BOX_SIZE / 2, BOX_SIZE / 2);

//Back face
glNormal3f(0.0, 0.0f, -1.0f);
glVertex3f(-BOX_SIZE / 2, -BOX_SIZE / 2, -BOX_SIZE / 2);
glVertex3f(-BOX_SIZE / 2, BOX_SIZE / 2, -BOX_SIZE / 2);
glVertex3f(BOX_SIZE / 2, BOX_SIZE / 2, -BOX_SIZE / 2);
glVertex3f(BOX_SIZE / 2, -BOX_SIZE / 2, -BOX_SIZE / 2);

glEnd();

glPopMatrix();	
glutSwapBuffers();

}
  
     };
class sphere:public Shape {
     public:
     static void drawscene_sphere()
     {
       glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
  glMatrixMode(GL_MODELVIEW);
glLoadIdentity();
   //glColor3d(1.0f,3.0f,2.0f); 
glColor3d(1.0f,1.0f,2.0f); 
   glPushMatrix();
       glRotatef(_angle, -0.1f, 0.0f, 0.8f);
       glTranslated(1.0f,1.0f,-5.0f);
       glutSolidSphere(1,50,50);
   
   glPopMatrix(); 

    glMatrixMode(GL_MODELVIEW);
glLoadIdentity();
   
   glRotatef(_angle, -0.0f, 0.0f, -1.6f);
   
   glPushMatrix();
       glTranslated(-0.4f,-0.4f,-5.0f);
       glutWireSphere(1.0f,85,85);
      
glPopMatrix(); 

   glutSwapBuffers();     
            
            }
     };      
class Pyramid: public Shape
     {
           public :
           
static void drawscene_pyramid() {
    
glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
glMatrixMode(GL_MODELVIEW);
glLoadIdentity();

glTranslatef(0.0f, 0.0f, -8.0f);


GLfloat ambientColor[] = {0.5f, 0.3f, 0.6f, 1.0f}; 
glLightModelfv(GL_LIGHT_MODEL_AMBIENT, ambientColor);


GLfloat lightColor0[] = {0.5f, 0.5f, 0.5f, 1.0f}; 
GLfloat lightPos0[] = {4.0f, 0.0f, 8.0f, 1.0f}; 
glLightfv(GL_LIGHT0, GL_DIFFUSE, lightColor0);
glLightfv(GL_LIGHT0, GL_POSITION, lightPos0);


GLfloat lightColor1[] = {0.5f, 0.2f, 0.2f, 1.0f}; 

GLfloat lightPos1[] = {-1.0f, 0.5f, 0.5f, 0.0f};
glLightfv(GL_LIGHT1, GL_DIFFUSE, lightColor1);
glLightfv(GL_LIGHT1, GL_POSITION, lightPos1);

glRotatef(_angle, 1.0f, 1.0f, 0.0f);

glColor3f(1.0f, 1.0f, 0.0f);

glBegin(GL_TRIANGLES);

glVertex3f( 0.0f, 1.0f, 0.0f);
     glColor3f(0.0f, 1.0f, 0.0f);    
     glVertex3f(-1.0f, -1.0f, 1.0f);
     glColor3f(0.0f, 0.0f, 1.0f);    
     glVertex3f(1.0f, -1.0f, 1.0f);

    
     glColor3f(1.0f, 0.0f, 0.0f);     
     glVertex3f(0.0f, 1.0f, 0.0f);
     glColor3f(0.0f, 0.0f, 1.0f);     
     glVertex3f(1.0f, -1.0f, 1.0f);
     glColor3f(0.0f, 1.0f, 0.0f);     
     glVertex3f(1.0f, -1.0f, -1.0f);

     
     glColor3f(1.0f, 0.0f, 0.0f);     
     glVertex3f(0.0f, 1.0f, 0.0f);
     glColor3f(0.0f, 1.0f, 0.0f);     
     glVertex3f(1.0f, -1.0f, -1.0f);
     glColor3f(0.0f, 0.0f, 1.0f);     
     glVertex3f(-1.0f, -1.0f, -1.0f);

     
     glColor3f(1.0f,0.0f,0.0f);       
     glVertex3f( 0.0f, 1.0f, 0.0f);
     glColor3f(0.0f,0.0f,1.0f);       
     glVertex3f(-1.0f,-1.0f,-1.0f);
     glColor3f(0.0f,1.0f,0.0f);       
     glVertex3f(-1.0f,-1.0f, 1.0f);
     glEnd();
     
     glBegin(GL_QUADS);
    
glNormal3f(0.0, -1.0f, 0.0f);
glVertex3f(-1.0f, -1.0f, -1.0f);
glColor3f(1.0f,0.0f,0.0f); 
glVertex3f(1.0f, -1.0f, -1.0f);
glColor3f(0.0f,0.0f,1.0f);       
glVertex3f(1.0f, -1.0f,1.0f );
    glColor3f(0.0f,1.0f,0.0f); 
glVertex3f(-1.0f, -1.0f, 1.0f);
     
glEnd();

glutSwapBuffers();
}
};
 class Cone : public Shape{
       public:

static void drawscene_cone()
{

 	glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
glMatrixMode(GL_MODELVIEW);
glLoadIdentity();

glTranslatef(0.0f, 0.0f, -8.0f);


GLfloat ambientColor[] = {0.5f, 0.3f, 0.6f, 1.0f}; 
glLightModelfv(GL_LIGHT_MODEL_AMBIENT, ambientColor);


GLfloat lightColor0[] = {0.5f, 0.5f, 0.5f, 1.0f};
GLfloat lightPos0[] = {4.0f, 0.0f, 8.0f, 1.0f}; 
glLightfv(GL_LIGHT0, GL_DIFFUSE, lightColor0);
glLightfv(GL_LIGHT0, GL_POSITION, lightPos0);


GLfloat lightColor1[] = {0.5f, 0.2f, 0.2f, 1.0f}; 

GLfloat lightPos1[] = {-1.0f, 0.5f, 0.5f, 0.0f};
glLightfv(GL_LIGHT1, GL_DIFFUSE, lightColor1);
glLightfv(GL_LIGHT1, GL_POSITION, lightPos1);

glColor3d(0,1,0);
   glPushMatrix();
   
       glTranslated(-1.0f,1.0f,-1.0f);
         glRotatef(_angle, 1.0f, 1.0f, 0.5f);
       glutSolidCone(1.3f, 2, 20, 1);
   glPopMatrix();

   glPushMatrix();
       glTranslated(0.0,-1.5,-2);
         glRotatef(_angle, 1.0f, 1.0f, 0.5f);
       glutWireCone(1.3f,2, 40, 25);
   glPopMatrix();

   glutSwapBuffers();
}

};




class Prism : public Shape{
      public :



static void drawscene_prism()
{
     glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
glMatrixMode(GL_MODELVIEW);
glLoadIdentity();

glTranslatef(0.0f, 0.0f, -10.0f);


GLfloat ambientColor[] = {0.5f, 0.3f, 0.6f, 1.0f}; 
glLightModelfv(GL_LIGHT_MODEL_AMBIENT, ambientColor);


GLfloat lightColor0[] = {0.5f, 0.5f, 0.5f, 1.0f}; 
GLfloat lightPos0[] = {4.0f, 0.0f, 8.0f, 1.0f}; 
glLightfv(GL_LIGHT0, GL_DIFFUSE, lightColor0);
glLightfv(GL_LIGHT0, GL_POSITION, lightPos0);


GLfloat lightColor1[] = {0.5f, 0.2f, 0.2f, 1.0f}; 

GLfloat lightPos1[] = {-1.0f, 0.5f, 0.5f, 0.0f};
glLightfv(GL_LIGHT1, GL_DIFFUSE, lightColor1);
glLightfv(GL_LIGHT1, GL_POSITION, lightPos1);
glRotatef(_angle, 0.0f, -1.0f, 1.0f);
       
   glBegin(GL_TRIANGLES);
     glColor3f(0.0f, 2.0f, 0.0f); 
   glVertex3f(2.0f, 0.0f, 0.0f);
      glColor3f(0.0f, 0.0f, 2.0f);     
   glVertex3f(0.0f, 0.0f, 0.0f);
         glColor3f(2.0f,0.0f,0.0f);       
   glVertex3f(0.0f, 2.0f, 0.0f);
   glEnd();

   
   glBegin(GL_TRIANGLES);
      glColor3f(0.0f, 2.0f, 0.0f); 
   glVertex3f(2.0f, 0.0f, 2.0f);
         glColor3f(2.0f,0.0f,0.0f);       
   glVertex3f(0.0f, 0.0f, 2.0f);
      glColor3f(0.0f, 0.0f, 2.0f);     
   glVertex3f(0.0f, 2.0f, 2.0f);
   glEnd();

   
   glBegin(GL_QUADS);
      glColor3f(0.0f, 2.0f, 0.0f); 
   glVertex3f(0.0f, 0.0f, 0.0f);
         glColor3f(2.0f,0.0f,0.0f);      
   glVertex3f(2.0f, 0.0f, 0.0f);
     glColor3f(0.0f, 0.0f, 2.0f);    
   glVertex3f(2.0f, 0.0f, 2.0f);
         glColor3f(0.0f, 0.0f, 2.0f);     
   glVertex3f(0.0f, 0.0f, 2.0f);
   
   glEnd();

  
   glBegin(GL_QUADS);
      glColor3f(0.0f, 2.0f, 0.0f); 
   glVertex3f(0.0f, 0.0f, 0.0f);
         glColor3f(2.0f,0.0f,0.0f);      
   glVertex3f(0.0f, 2.0f, 0.0f);
          glColor3f(0.0f, 0.0f, 2.0f);     
   glVertex3f(0.0f, 2.0f, 2.0f);
         glColor3f(2.0f,0.0f,0.0f);       
   glVertex3f(0.0f, 0.0f, 2.0f);
   glEnd();

   
   glBegin(GL_QUADS);
      glColor3f(0.0f, 2.0f, 0.0f); 
   glVertex3f(0.0f, 2.0f, 0.0f);
          glColor3f(0.0f, 0.0f, 2.0f);     
   glVertex3f(2.0f, 0.0f, 0.0f);
   glVertex3f(2.0f, 0.0f, 2.0f);
         glColor3f(2.0f,0.0f,0.0f);       
   glVertex3f(0.0f, 2.0f, 2.0f);
   glEnd();

glutSwapBuffers();
}



};


class torus:public Shape {
     public:
     static void drawscene_torus()
     {
       glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
  glMatrixMode(GL_MODELVIEW);
glLoadIdentity();
   glColor3d(1.0f,1.0f,2.0f); 
 
   glRotatef(_angle, -0.0f, -0.0f, -1.6f);
   glPushMatrix();
         glTranslated(1.0f,1.0f,-6.0f);
     
       glutSolidTorus(0.4, 0.8, 85, 85);
   glPopMatrix(); 
  
   glPushMatrix();
       glTranslated(-1.0f,-1.0f,-6.0f);
       glutWireTorus(0.4, 0.8,50 ,50 );
   glPopMatrix(); 

   glutSwapBuffers();     
            
            }
     };  
class cubeoid:public Shape
{
     public:
static void drawscene_cubeoid()
{
       
     glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

glMatrixMode(GL_MODELVIEW);
glLoadIdentity();

glTranslatef(0.0f, 0.0f, -10.0f);

GLfloat ambientLight[] = {0.3f, 0.3f, 0.3f, 1.0f};
glLightModelfv(GL_LIGHT_MODEL_AMBIENT, ambientLight);

GLfloat lightColor[] = {0.7f, 0.7f, 0.7f, 1.0f};
GLfloat lightPos[] = {4.0f, 0.0f, 8.0f, 1.0f};
glLightfv(GL_LIGHT0, GL_DIFFUSE, lightColor);
glLightfv(GL_LIGHT0, GL_POSITION, lightPos);

glRotatef(_angle, 1.0f, 1.0f, -1.6f);
glPushMatrix();
glBegin(GL_QUADS);
glColor3d(1.0f,3.0f,2.0f);  
     //front
   glNormal3f(0.0f, 0.0f, 1.0f);
   glVertex3f(-1.5f, -1.0f, 1.5f);
   glVertex3f(1.5f, -1.0f, 1.5f);
   glVertex3f(1.5f, 1.0f, 1.5f);
   glVertex3f(-1.5f, 1.0f, 1.5f);

   //Right
   glNormal3f(1.0f, 0.0f, 0.0f);
   glVertex3f(1.5f, -1.0f, -1.5f);
   glVertex3f(1.5f, 1.0f, -1.5f);
   glVertex3f(1.5f, 1.0f, 1.5f);
   glVertex3f(1.5f, -1.0f, 1.5f);

   //Back
   glNormal3f(0.0f, 0.0f, -1.0f);
   glVertex3f(-1.5f, -1.0f, -1.5f);
   glVertex3f(-1.5f, 1.0f, -1.5f);
   glVertex3f(1.5f, 1.0f, -1.5f);
   glVertex3f(1.5f, -1.0f, -1.5f);

   //Left
   glNormal3f(-1.0f, 0.0f, 0.0f);
   glVertex3f(-1.5f, -1.0f, -1.5f);
   glVertex3f(-1.5f, -1.0f, 1.5f);
   glVertex3f(-1.5f, 1.0f, 1.5f);
   glVertex3f(-1.5f, 1.0f, -1.5f);
    glEnd();

  glutSwapBuffers();
}  
     };
     
     
class Graphs : public Shape{
     public: 
             Graphs(){} 
                      
            void my_init(){
       glPointSize(5.0); 
    glMatrixMode(GL_PROJECTION); 
    glLoadIdentity(); 
    gluOrtho2D(0.0, (GLdouble)screenWidth, 0.0, (GLdouble)screenHeight);
    A= screenWidth / 20.0; 
    B = 0.0; 
    C = D = screenHeight/ 5.5 ;
 
 
                  
                  } 
                  
                  
             static void my_graph() {
             
    glClear(GL_COLOR_BUFFER_BIT);
    glBegin(GL_POINTS); 
    for(GLdouble x = 0; x< 4.0 ; x+=0.005){
                 
                 GLdouble func = exp(-x) * cos(2 * 3.141 * x); 
                 glVertex2d( A * x + B, C * func + D); 
                 } 
    glEnd(); 
    glFlush(); 
    glutSwapBuffers(); 

                   
} 
     
     
     };

static int window;
static int menu_id;
static int submenu_id;
static int value = 0; 
void menu(int num){
 if(num == 0){
  
   exit(0);
 }else{
   value = num;
 }
 glutPostRedisplay();
} 
     void createMenu(void){ 
   submenu_id = glutCreateMenu(menu);
   glutAddMenuEntry("Cube", 2);
   glutAddMenuEntry("Cone", 3);
   glutAddMenuEntry("Sphere", 4);
   glutAddMenuEntry("Pyramid", 5); 
   glutAddMenuEntry("Prism", 6);
   glutAddMenuEntry("Torus", 7);
   glutAddMenuEntry("Cubeoid", 8);
   glutAddMenuEntry("Cos Graph", 9);  
   menu_id = glutCreateMenu(menu);
   glutAddMenuEntry("Pause", 1);
   glutAddSubMenu("Draw", submenu_id);
   glutAddMenuEntry("Quit", 0);  
   glutAttachMenu(GLUT_RIGHT_BUTTON);
} 

void display(void){
 glClear(GL_COLOR_BUFFER_BIT);
  if(value == 1){
           glClear(GL_COLOR_BUFFER_BIT); 
      return;
      }
 else if(value == 2){
       cube::drawScenecube();
 }else if(value == 3){
 Cone::drawscene_cone();
 }else if(value == 4){
  sphere::drawscene_sphere();
 }else if(value == 5){
  Pyramid::drawscene_pyramid();
 }
 else if(value == 6){
      Prism::drawscene_prism();
      }
  else if(value == 7){
       torus::drawscene_torus();
       }
   else if(value == 8){
        cubeoid::drawscene_cubeoid();
        }
    else if(value == 9){           
   my_init();
   Graphs::my_graph();
 
   }
 glFlush();
} 
     
int main(int argc, char** argv) {
   
   glutInit(&argc, argv);
   static Shape obj1; 
   obj1.initRendering();
   createMenu();
   glutInitWindowSize(500,500);
   glutInitWindowPosition(100,100);
   glutDisplayFunc( display );
   glutKeyboardFunc(Shape::handleKeypress);
   glutInitDisplayMode(GLUT_SINGLE | GLUT_RGB); 
   glutInitWindowSize(screenWidth, screenHeight);

 
   glutReshapeFunc(Shape::handleResize);
   glutTimerFunc(15,Shape::update, 0);	

    
   glutMainLoop(); 
   
           
  
system("pause");
   return 0;
}
