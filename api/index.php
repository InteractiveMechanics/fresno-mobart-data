<?php
    date_default_timezone_set('America/New_York');

    require 'db.php';
    require 'vendor/autoload.php';

    $app = new \Slim\Slim();
    $app->config('debug', true);

    $app->get('/grades', getGrades);
    $app->get('/grades/:gid', getGradeById);
    $app->get('/classes', getClasses);
    $app->get('/classes/:cid', getClassById);
    $app->get('/classes/:cid/students', getStudentsFromClass);
    $app->get('/projects/', getProjects);
    $app->get('/projects/:pid', getProjectById);
    $app->get('/files/:fid', getFileById);

    $app->post('/classes', postClass);
    $app->post('/students', postStudent);
    $app->post('/projects', postProject);
    $app->post('/files', postFile);

    $app->put('/classes/:cid', updateClass);
    $app->put('/projects/:pid', updateProject);

    $app->delete('/classes/:cid', deleteClass);
    $app->delete('/students/:sid', deleteStudent);
    $app->delete('/projects/:pid', deleteProject);

    $app->run();

    function getGrades() {
        $sql = '
            SELECT
                mobart_project_grade.id,
                mobart_student.cid, 
                mobart_class.classname, 
                mobart_class.classtype, 
                mobart_class.tid,
                mobart_student.firstname, 
                mobart_student.lastname, 
                mobart_project_grade.ex1grade, 
                mobart_project_grade.ex2grade, 
                mobart_project_grade.ex3grade, 
                mobart_project_grade.ex4grade
            FROM 
                mobart_class, 
                mobart_student, 
                mobart_project_grade 
            WHERE 
                mobart_class.id = mobart_student.cid 
            AND 
                mobart_student.id = mobart_project_grade.sid 
            ORDER BY 
                mobart_class.id DESC';
        try {
            $db     = getDB();
            $query  = $db->query($sql);
            $tours  = $query->fetchAll(PDO::FETCH_OBJ);
            $db     = null;
    
            echo json_encode($tours);
        } catch(PDOException $e) {
            echo json_encode($e->getMessage());
        }
    }
    function getGradeById($gid) {
        $sql = '
            SELECT 
                mobart_project_grade.id,
                mobart_class.classname, 
                mobart_class.classtype, 
                mobart_student.firstname, 
                mobart_student.lastname, 
                mobart_project_grade.ex1grade, 
                mobart_project_grade.ex2grade, 
                mobart_project_grade.ex3grade, 
                mobart_project_grade.ex4grade 
            FROM 
                mobart_class, 
                mobart_student, 
                mobart_project_grade
            WHERE 
                mobart_project_grade.id = ' . $gid . ' 
            AND 
                mobart_project_grade.sid = mobart_student.id 
            ORDER BY 
                mobart_class.id DESC
            LIMIT 1';
        try {
            $db     = getDB();
            $query  = $db->query($sql);
            $tour   = $query->fetchAll(PDO::FETCH_OBJ);
            $db     = null;
    
            echo json_encode($tour);
        } catch(PDOException $e) {
            echo json_encode($e->getMessage());
        }
    }
    function getClasses() {
        $sql = '
            SELECT
                mobart_class.id,
                mobart_class.classname,
                mobart_class.classtype,
                mobart_class.room,
                mobart_class.tid,
                mobart_project.name
            FROM 
                mobart_class,
                mobart_project
            ORDER BY 
                mobart_class.id DESC';
        try {
            $db     = getDB();
            $query  = $db->query($sql);
            $tours  = $query->fetchAll(PDO::FETCH_OBJ);
            $db     = null;
    
            echo json_encode($tours);
        } catch(PDOException $e) {
            echo json_encode($e->getMessage());
        }
    }
    function getClassById($cid) {
        $sql = '
            SELECT
                mobart_class.id,
                mobart_class.classname,
                mobart_class.classtype,
                mobart_class.room,
                mobart_class.tid,
                mobart_project.name                
            FROM 
                mobart_class,
                mobart_project
            WHERE
                mobart_class.id = ' . $cid . '
            ORDER BY 
                mobart_class.id DESC';
        try {
            $db     = getDB();
            $query  = $db->query($sql);
            $tours  = $query->fetchAll(PDO::FETCH_OBJ);
            $db     = null;
    
            echo json_encode($tours);
        } catch(PDOException $e) {
            echo json_encode($e->getMessage());
        }
    }
    function getStudentsFromClass($cid) {
        $sql = '
            SELECT
                mobart_student.id,
                mobart_student.cid,
                mobart_student.firstname,
                mobart_student.lastname
            FROM 
                mobart_class, 
                mobart_student 
            WHERE 
                mobart_class.id = ' . $cid . ' 
            AND 
                mobart_student.cid = ' . $cid . ' 
            ORDER BY 
                mobart_class.id DESC';
        try {
            $db     = getDB();
            $query  = $db->query($sql);
            $tour   = $query->fetchAll(PDO::FETCH_OBJ);
            $db     = null;
    
            echo json_encode($tour);
        } catch(PDOException $e) {
            echo json_encode($e->getMessage());
        }
    }
    function getProjects() {
        $sql = '
            SELECT
                mobart_project.id,
                mobart_project.name
            FROM 
                mobart_project 
            ORDER BY 
                mobart_project.id DESC';
        try {
            $db     = getDB();
            $query  = $db->query($sql);
            $tours  = $query->fetchAll(PDO::FETCH_OBJ);
            $db     = null;
    
            echo json_encode($tours);
        } catch(PDOException $e) {
            echo json_encode($e->getMessage());
        }
    }
    function getProjectById($pid) {
        $sql = '
            SELECT * 
            FROM 
                mobart_project, 
                mobart_dimension 
            WHERE 
                mobart_project.id = ' . $pid . ' 
            AND 
                mobart_dimension.pid = ' . $pid . ' 
            ORDER BY 
                mobart_project.id DESC';
        try {
            $db     = getDB();
            $query  = $db->query($sql);
            $tour   = $query->fetchAll(PDO::FETCH_OBJ);
            $db     = null;
    
            echo json_encode($tour);
        } catch(PDOException $e) {
            echo json_encode($e->getMessage());
        }
    }
    function getFileById($fid) {
        $sql = '
            SELECT * 
            FROM mobart_file 
            WHERE id = ' . $fid;
        try {
            $db     = getDB();
            $query  = $db->query($sql);
            $tour   = $query->fetchAll(PDO::FETCH_OBJ);
            $db     = null;
    
            echo json_encode($tour);
        } catch(PDOException $e) {
            echo json_encode($e->getMessage());
        }
    }


    function postClass() {
        global $app;

        $req    = json_decode($app->request->getBody());
        $vars   = get_object_vars($req);
     
        $sql = '
            INSERT INTO mobart_class (`classname`, `room`, `tid`, `pid`, `classtype`) 
            VALUES (:classname, :room, :tid, :pid, :classtype)';
        try {
            $db = getDB();
            $stmt = $db->prepare($sql);  
            $stmt->bindParam('classname', $vars['classname']);
            $stmt->bindParam('room', $vars['room']);
            $stmt->bindParam('tid', $vars['tid']);
            $stmt->bindParam('pid', $vars['pid']);
            $stmt->bindParam('classtype', $vars['classtype']);
            $stmt->execute();

            $db = null;
        } catch(PDOException $e) {
            echo json_encode($e->getMessage()); 
        }
    }
    function postStudent() {
        global $app;

        $req    = json_decode($app->request->getBody());
        $vars   = get_object_vars($req);
     
        $sql = '
            INSERT INTO mobart_student (`firstname`, `lastname`, `cid`) 
            VALUES (:firstname, :lastname, :cid)';
        try {
            $db = getDB();
            $stmt = $db->prepare($sql);  
            $stmt->bindParam('firstname', $vars['firstname']);
            $stmt->bindParam('lastname', $vars['lastname']);
            $stmt->bindParam('cid', $vars['cid']);
            $stmt->execute();

            $db = null;
        } catch(PDOException $e) {
            echo json_encode($e->getMessage()); 
        }
    }
    function postProject() {
        global $app;

        $req    = json_decode($app->request->getBody());
        $vars   = get_object_vars($req);
     
        $sql = '
            INSERT INTO mobart_project (`name`) 
            VALUES (:name)';
        try {
            $db = getDB();
            $stmt = $db->prepare($sql);  
            $stmt->bindParam('name', $vars['name']);
            $stmt->execute();

            $db = null;
        } catch(PDOException $e) {
            echo json_encode($e->getMessage()); 
        }
    }
    function postFile() {
        global $app;

        $req    = json_decode($app->request->getBody());
        $vars   = get_object_vars($req);
     
        $sql = '
            INSERT INTO mobart_file (`filename`, `filepath`, `mimetype`) 
            VALUES (:filename, :filepath, :mimetype)';
        try {
            $db = getDB();
            $stmt = $db->prepare($sql);  
            $stmt->bindParam('filename', $vars['filename']);
            $stmt->bindParam('filepath', $vars['filepath']);
            $stmt->bindParam('mimetype', $vars['mimetype']);
            $stmt->execute();

            $db = null;
        } catch(PDOException $e) {
            echo json_encode($e->getMessage()); 
        }
    }


    function updateClass($cid) {
        global $app;

        $req    = json_decode($app->request->getBody());
        $vars   = get_object_vars($req);
     
        $sql = '
            UPDATE mobart_class 
            SET classname = :classname, 
                room = :room, 
                tid = :tid, 
                pid = :pid, 
                classtype = :classtype 
            WHERE id = :cid';
        try {
            $db = getDB();
            $stmt = $db->prepare($sql);
            $stmt->bindParam('cid', $cid);
            $stmt->bindParam('classname', $vars['classname']);
            $stmt->bindParam('room', $vars['room']);
            $stmt->bindParam('tid', $vars['tid']);
            $stmt->bindParam('pid', $vars['pid']);
            $stmt->bindParam('classtype', $vars['classtype']);
            $stmt->execute();

            $db = null;
        } catch(PDOException $e) {
            echo json_encode($e->getMessage()); 
        }
    }
    function updateProject($pid) {
        global $app;

        $req    = json_decode($app->request->getBody());
        $vars   = get_object_vars($req);
     
        $sql = '
            UPDATE mobart_project 
            SET name = :name 
            WHERE id = :pid';
        try {
            $db = getDB();
            $stmt = $db->prepare($sql);
            $stmt->bindParam('pid', $pid);
            $stmt->bindParam('name', $vars['name']);
            $stmt->execute();

            $db = null;
        } catch(PDOException $e) {
            echo json_encode($e->getMessage()); 
        }
    }


    function deleteClass($cid) {
        $sql = '
            DELETE FROM mobart_class 
            WHERE id = :cid';
        try {
            $db = getDB();
            $stmt = $db->prepare($sql);  
            $stmt->bindParam('cid', $sid);
            $stmt->execute();

            $db = null;
        } catch(PDOException $e) {
            echo json_encode($e->getMessage());
        }
    }
    function deleteStudent($sid) {
        $sql = '
            DELETE FROM mobart_student 
            WHERE id = :sid';
        try {
            $db = getDB();
            $stmt = $db->prepare($sql);  
            $stmt->bindParam('sid', $sid);
            $stmt->execute();

            $db = null;
        } catch(PDOException $e) {
            echo json_encode($e->getMessage());
        }
    }
    function deleteProject($pid) {
        $sql = '
            DELETE FROM mobart_project 
            WHERE id = :pid';
        try {
            $db = getDB();
            $stmt = $db->prepare($sql);  
            $stmt->bindParam('pid', $sid);
            $stmt->execute();

            $db = null;
        } catch(PDOException $e) {
            echo json_encode($e->getMessage());
        }
    }
