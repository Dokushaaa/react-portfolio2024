<?php

Class About {
    public $about_aid;
    public $about_title;
    public $about_description;
    public $about_image;
    public $about_is_active;
    public $about_published_date;
    public $about_created;
    public $about_datetime;
    
    public $about_search;
    public $connection;
    public $lastInsertedId;
    public $tblabout;

    public function __construct($db) {
        $this->connection = $db;
        $this->tblabout = "tbl_about";
    }

    public function create() {
        try {
             $sql = "insert into {$this->tblabout} ";
             $sql .= "( about_title, ";
             $sql .= "about_description, ";
             $sql .= "about_image, ";
             $sql .= "about_is_active, ";
             $sql .= "about_published_date, ";
             $sql .= "about_created, ";
             $sql .= "about_datetime ) values ( ";
             $sql .= ":about_title, ";
             $sql .= ":about_description, ";
             $sql .= ":about_image, ";
             $sql .= ":about_is_active, ";
             $sql .= ":about_published_date, ";
             $sql .= ":about_created, ";
             $sql .= ":about_datetime ) ";
             $query = $this->connection->prepare($sql);
             $query->execute([
                "about_title" => $this->about_title,
                "about_description" => $this->about_description,
                "about_image" => $this->about_image,
                "about_is_active" => $this->about_is_active,
                "about_published_date" => $this->about_published_date,
                "about_description" => $this->about_description,
                "about_created" => $this->about_created,
                "about_datetime" => $this->about_datetime,
             ]);
        $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = false;
        }
        
        return $query;
    }
    
    public function readAll()
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblabout} ";
            $sql .= "order by about_is_active desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    public function delete()
    {
        try {
            $sql = "delete from {$this->tblabout} ";
            $sql .= "where about_aid = :about_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "about_aid" => $this->about_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    public function update()
    {
        try {
            $sql = "update {$this->tblabout} set ";
            $sql .= "about_title = :about_title, ";
            $sql .= "about_description = :about_description, ";
            $sql .= "about_image = :about_image, ";     
            $sql .= "about_published_date = :about_published_date, ";
            $sql .= "about_datetime = :about_datetime ";
            $sql .= "where about_aid = :about_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "about_title" => $this->about_title,
                "about_description" => $this->about_description,
                "about_image" => $this->about_image,
                "about_published_date" => $this->about_published_date,
                "about_datetime" => $this->about_datetime,
                "about_aid" => $this->about_aid,
         
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    public function active()
    {
        try {
            $sql = "update {$this->tblabout} set ";
            $sql .= "about_is_active = :about_is_active, ";
            $sql .= "about_datetime = :about_datetime ";
            $sql .= "where about_aid  = :about_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "about_is_active" => $this->about_is_active,
                "about_datetime" => $this->about_datetime,
                "about_aid" => $this->about_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    public function search()
    {
        try {
            $sql = "select ";
            $sql .= "* ";
            $sql .= "from {$this->tblabout} ";
            $sql .= "where about_title like :about_title ";
            $sql .= "order by about_is_active desc, ";
            $sql .= "about_title asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "about_title" => "%{$this->about_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}