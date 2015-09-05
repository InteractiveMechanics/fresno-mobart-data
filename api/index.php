<?php
    date_default_timezone_set('America/New_York');

    require 'db.php';
    require 'vendor/autoload.php';

    $app = new \Slim\Slim();
    $app->config('debug', true);

    $app->get('/grades', getGrades);
    $app->get('/grades/:gid', getGradeById);
    $app->get('/incomplete/:tid', getIncompleteGradesById);
    $app->get('/saved/:tid', getSavedGradesById);
    $app->get('/classes', getClasses);
    $app->get('/classes/:cid', getClassById);
    $app->get('/classes/:cid/students', getStudentsFromClass);
    $app->get('/projects/', getProjects);
    $app->get('/projects/:pid', getProjectById);
    $app->get('/files/:fid', getFileById);
    $app->get('/teachers', getTeachersFromMoodle);

    $app->post('/files', postFile);
    $app->post('/classes', postClass);
    $app->post('/classes/:cid/students', postStudent);
    $app->post('/grades', postGrade);

    $app->put('/grades/:gid', updateGrade);
    $app->put('/classes/:cid', updateClass);
    $app->put('/classes/:cid/students/:sid', updateStudent);

    $app->delete('/grades/:gid', deleteGrade);
    $app->delete('/classes/:cid', deleteClass);
    $app->delete('/classes/:cid/students/:sid', deleteStudent);
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
                mobart_project_grade.pid,
                mobart_student.firstname, 
                mobart_student.lastname, 
                mobart_project_grade.incomplete,
                mobart_project_grade.ex1grade, 
                mobart_project_grade.ex2grade, 
                mobart_project_grade.ex3grade, 
                mobart_project_grade.ex4grade,
                mobart_project_grade.artworkid,
                mobart_project_grade.writingid,
                artwork.filename AS artworkfilepath,
                artwork.mimetype AS artworkmimetype,
                writingsample.filename AS writingsamplefilepath
            FROM 
                mobart_class, 
                mobart_student, 
                mobart_project_grade
            LEFT JOIN
                mobart_file artwork
            ON
                mobart_project_grade.artworkid = artwork.id
            LEFT JOIN 
                mobart_file writingsample
            ON
                mobart_project_grade.writingid = writingsample.id
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
    function getIncompleteGradesById($tid) {
        $sql = '
            SELECT
                mobart_project_grade.id,
                mobart_student.cid, 
                mobart_class.classname, 
                mobart_class.classtype, 
                mobart_class.tid,
                mobart_project_grade.pid,
                mobart_student.firstname, 
                mobart_student.lastname, 
                mobart_project_grade.ex1grade, 
                mobart_project_grade.ex2grade, 
                mobart_project_grade.ex3grade, 
                mobart_project_grade.ex4grade,
                mobart_project_grade.artworkid,
                mobart_project_grade.writingid,
                artwork.filename AS artworkfilepath,
                artwork.mimetype AS artworkmimetype,
                writingsample.filename AS writingsamplefilepath
            FROM 
                mobart_class, 
                mobart_student, 
                mobart_project_grade
            LEFT JOIN
                mobart_file artwork
            ON
                mobart_project_grade.artworkid = artwork.id
            LEFT JOIN 
                mobart_file writingsample
            ON
                mobart_project_grade.writingid = writingsample.id
            WHERE 
                mobart_class.id = mobart_student.cid 
            AND 
                mobart_class.tid = ' . $tid . ' 
            AND 
                mobart_student.id = mobart_project_grade.sid
            AND
                mobart_project_grade.incomplete = 1
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
    function getSavedGradesById($tid) {
        $sql = '
            SELECT
                mobart_project_grade.id,
                mobart_student.cid, 
                mobart_class.classname, 
                mobart_class.classtype, 
                mobart_class.tid,
                mobart_project_grade.pid,
                mobart_student.firstname, 
                mobart_student.lastname, 
                mobart_project_grade.ex1grade, 
                mobart_project_grade.ex2grade, 
                mobart_project_grade.ex3grade, 
                mobart_project_grade.ex4grade,
                mobart_project_grade.artworkid,
                mobart_project_grade.writingid,
                artwork.filename AS artworkfilepath,
                artwork.mimetype AS artworkmimetype,
                writingsample.filename AS writingsamplefilepath
            FROM 
                mobart_class, 
                mobart_student, 
                mobart_project_grade
            LEFT JOIN
                mobart_file artwork
            ON
                mobart_project_grade.artworkid = artwork.id
            LEFT JOIN 
                mobart_file writingsample
            ON
                mobart_project_grade.writingid = writingsample.id
            WHERE 
                mobart_class.id = mobart_student.cid 
            AND 
                mobart_class.tid = ' . $tid . ' 
            AND 
                mobart_student.id = mobart_project_grade.sid
            AND
                mobart_project_grade.saved = 1
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
                mobart_class.id as cid,
                mobart_class.classname, 
                mobart_class.classtype,
                mobart_project_grade.pid,
                mobart_student.id as sid,
                mobart_student.firstname, 
                mobart_student.lastname, 
                mobart_project_grade.incomplete,
                mobart_project_grade.ex1grade, 
                mobart_project_grade.ex2grade, 
                mobart_project_grade.ex3grade, 
                mobart_project_grade.ex4grade,
                mobart_project_grade.artworkid,
                mobart_project_grade.writingid,
                artwork.filename AS artworkfilepath,
                artwork.mimetype AS artworkmimetype,
                writingsample.filename AS writingsamplefilepath
            FROM 
                mobart_class, 
                mobart_student, 
                mobart_project_grade
            LEFT JOIN
                mobart_file artwork
            ON
                mobart_project_grade.artworkid = artwork.id
            LEFT JOIN 
                mobart_file writingsample
            ON
                mobart_project_grade.writingid = writingsample.id
            WHERE 
                mobart_project_grade.id = ' . $gid . '
            AND
                mobart_class.id = mobart_student.cid
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
                mobart_class.tid
            FROM 
                mobart_class
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
                mobart_class.tid              
            FROM 
                mobart_class,
                mobart_project
            WHERE
                mobart_class.id = ' . $cid . '
            ORDER BY 
                mobart_class.id DESC
            LIMIT 1';
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
            SELECT 
                filename,
                filepath,
                mimetype
            FROM 
                mobart_file 
            WHERE 
                id = ' . $fid;
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
    function getTeachersFromMoodle() {
        $sql = '
            SELECT 
                id AS tid,
                firstname,
                lastname
            FROM 
                mdl_user';
        try {
            $db     = getMoodleDB();
            $query  = $db->query($sql);
            $tour   = $query->fetchAll(PDO::FETCH_OBJ);
            $db     = null;
    
            echo json_encode($tour);
        } catch(PDOException $e) {
            echo json_encode($e->getMessage());
        }
    }

    function postFile() {
        global $app;

        $req    = json_decode($app->request->getBody());
        $vars   = get_object_vars($req);
     
        $sql = '
            INSERT INTO 
                mobart_file (`filename`, `filepath`, `mimetype`) 
            VALUES 
                (:filename, "/files/", :mimetype)';
        try {
            $db = getDB();
            $stmt = $db->prepare($sql);  
            $stmt->bindParam('filename', $vars['name']);
            $stmt->bindParam('mimetype', $vars['mimetype']);
            $stmt->execute();

            $result = $db->lastInsertId();
            print_r($result);            
            
            $db = null;
        } catch(PDOException $e) {
            echo json_encode($e->getMessage()); 
        }
    }
    function postClass() {
        global $app;

        $req    = json_decode($app->request->getBody());
        $vars   = get_object_vars($req);
     
        $sql = '
            INSERT INTO 
                mobart_class (`classname`, `room`, `classtype`, `tid`) 
            VALUES 
                (:classname, :room, :classtype, :tid)';
        try {
            $db = getDB();
            $stmt = $db->prepare($sql);  
            $stmt->bindParam('classname', $vars['classname']);
            $stmt->bindParam('room', $vars['room']);
            $stmt->bindParam('classtype', $vars['classtype']);
            $stmt->bindParam('tid', $vars['tid']);
            $stmt->execute();

            $db = null;
        } catch(PDOException $e) {
            echo json_encode($e->getMessage()); 
        }
    }
    function postStudent($cid) {
        global $app;

        $req    = json_decode($app->request->getBody());
        $vars   = get_object_vars($req);
     
        $sql = '
            INSERT INTO 
                mobart_student (`firstname`, `lastname`, `cid`) 
            VALUES 
                (:firstname, :lastname, :cid)';
        try {
            $db = getDB();
            $stmt = $db->prepare($sql);  
            $stmt->bindParam('cid', $vars['id']);
            $stmt->bindParam('firstname', $vars['firstname']);
            $stmt->bindParam('lastname', $vars['lastname']);
            $stmt->execute();

            $db = null;
        } catch(PDOException $e) {
            echo json_encode($e->getMessage()); 
        }
    }
    function postGrade() {
        global $app;

        $req    = json_decode($app->request->getBody());
        $vars   = get_object_vars($req);
     
        $sql = '
            INSERT INTO 
                mobart_project_grade (`cid`, `sid`, `incomplete`, `saved`, `artworkid`, `writingid`, `ex1grade`, `ex2grade`, `ex3grade`, `ex4grade`, `pid`) 
            VALUES 
                (:cid, :sid, :incomplete, :saved, :artworkid, :writingid, :ex1grade, :ex2grade, :ex3grade, :ex4grade, :pid)';
        try {
            $db = getDB();
            $stmt = $db->prepare($sql);  
            $stmt->bindParam('cid', $vars['cid']);
            $stmt->bindParam('sid', $vars['sid']);
            $stmt->bindParam('incomplete', $vars['incomplete']);
            $stmt->bindParam('saved', $vars['saved']);
            $stmt->bindParam('artworkid', $vars['artworkid']);
            $stmt->bindParam('writingid', $vars['writingid']);
            $stmt->bindParam('ex1grade', $vars['ex1grade']);
            $stmt->bindParam('ex2grade', $vars['ex2grade']);
            $stmt->bindParam('ex3grade', $vars['ex3grade']);
            $stmt->bindParam('ex4grade', $vars['ex4grade']);
            $stmt->bindParam('pid', $vars['pid']);
            $stmt->execute();

            $db = null;
        } catch(PDOException $e) {
            echo json_encode($e->getMessage()); 
        }
    }


    function updateGrade($gid) {
        global $app;

        $req    = json_decode($app->request->getBody());
        $vars   = get_object_vars($req);
     
        $sql = '
            UPDATE 
                mobart_project_grade
            SET 
                saved = :saved,
                incomplete = :incomplete,
                ex1grade = :ex1grade, 
                ex2grade = :ex2grade, 
                ex3grade = :ex3grade, 
                ex4grade = :ex4grade,
                artworkid = :artworkid,
                writingid = :writingid
            WHERE 
                id = :gid';
        try {
            $db = getDB();
            $stmt = $db->prepare($sql);
            $stmt->bindParam('gid', $gid);
            $stmt->bindParam('incomplete', $vars['incomplete']);
            $stmt->bindParam('saved', $vars['saved']);
            $stmt->bindParam('ex1grade', $vars['ex1grade']);
            $stmt->bindParam('ex2grade', $vars['ex2grade']);
            $stmt->bindParam('ex3grade', $vars['ex3grade']);
            $stmt->bindParam('ex4grade', $vars['ex4grade']);
            $stmt->bindParam('artworkid', $vars['artworkid']);
            $stmt->bindParam('writingid', $vars['writingid']);
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
            UPDATE 
                mobart_class
            SET 
                classname = :classname, 
                classtype = :classtype, 
                room = :room, 
                tid = :tid
            WHERE 
                id = :cid';
        try {
            $db = getDB();
            $stmt = $db->prepare($sql);
            $stmt->bindParam('cid', $cid);
            $stmt->bindParam('classname', $vars['classname']);
            $stmt->bindParam('classtype', $vars['classtype']);
            $stmt->bindParam('room', $vars['room']);
            $stmt->bindParam('tid', $vars['tid']);
            $stmt->execute();

            $db = null;
        } catch(PDOException $e) {
            echo json_encode($e->getMessage()); 
        }
    }
    function updateStudent($cid, $sid) {
        global $app;

        $req    = json_decode($app->request->getBody());
        $vars   = get_object_vars($req);
     
        $sql = '
            UPDATE 
                mobart_student
            SET 
                firstname = :firstname, 
                lastname = :lastname,
                cid = :cid 
            WHERE 
                id = :sid';
        try {
            $db = getDB();
            $stmt = $db->prepare($sql);
            $stmt->bindParam('sid', $sid);
            $stmt->bindParam('cid', $cid);
            $stmt->bindParam('firstname', $vars['firstname']);
            $stmt->bindParam('lastname', $vars['lastname']);
            $stmt->execute();

            $db = null;
        } catch(PDOException $e) {
            echo json_encode($e->getMessage()); 
        }
    }


    function deleteGrade($gid) {
        $sql = '
            DELETE FROM mobart_project_grade 
            WHERE id = :gid';
        try {
            $db = getDB();
            $stmt = $db->prepare($sql);  
            $stmt->bindParam('gid', $gid);
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
            $stmt->bindParam('cid', $cid);
            $stmt->execute();

            $db = null;
        } catch(PDOException $e) {
            echo json_encode($e->getMessage());
        }
    }
    function deleteStudent($cid, $sid) {
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
            $stmt->bindParam('pid', $pid);
            $stmt->execute();

            $db = null;
        } catch(PDOException $e) {
            echo json_encode($e->getMessage());
        }
    }
