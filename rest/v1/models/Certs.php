<?php

Class Certs {
    public $certs_aid;
    public $certs_title;
    public $certs_description;
    public $certs_image;
    public $certs_is_active;
    public $certs_published_date;
    public $certs_created;
    public $certs_datetime;
    
    public $certs_search;
    public $connection;
    public $lastInsertedId;
    public $tblcerts;

    public function __construct($db) {
        $this->connection = $db;
        $this->tblcerts = "tbl_certs";
    }

    public function create() {
        try {
             $sql = "insert into {$this->tblcerts} ";
             $sql .= "( certs_title, ";
             $sql .= "certs_description, ";
             $sql .= "certs_image, ";
             $sql .= "certs_is_active, ";
             $sql .= "certs_published_date, ";
             $sql .= "certs_created, ";
             $sql .= "certs_datetime ) values ( ";
             $sql .= ":certs_title, ";
             $sql .= ":certs_description, ";
             $sql .= ":certs_image, ";
             $sql .= ":certs_is_active, ";
             $sql .= ":certs_published_date, ";
             $sql .= ":certs_created, ";
             $sql .= ":certs_datetime ) ";
             $query = $this->connection->prepare($sql);
             $query->execute([
                "certs_title" => $this->certs_title,
                "certs_description" => $this->certs_description,
                "certs_image" => $this->certs_image,
                "certs_is_active" => $this->certs_is_active,
                "certs_published_date" => $this->certs_published_date,
                "certs_description" => $this->certs_description,
                "certs_created" => $this->certs_created,
                "certs_datetime" => $this->certs_datetime,
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
            $sql .= "from {$this->tblcerts} ";
            $sql .= "order by certs_is_active desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    public function delete()
    {
        try {
            $sql = "delete from {$this->tblcerts} ";
            $sql .= "where certs_aid = :certs_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "certs_aid" => $this->certs_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    public function update()
    {
        try {
            $sql = "update {$this->tblcerts} set ";
            $sql .= "certs_title = :certs_title, ";
            $sql .= "certs_description = :certs_description, ";
            $sql .= "certs_image = :certs_image, ";     
            $sql .= "certs_published_date = :certs_published_date, ";
            $sql .= "certs_datetime = :certs_datetime ";
            $sql .= "where certs_aid = :certs_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "certs_title" => $this->certs_title,
                "certs_description" => $this->certs_description,
                "certs_image" => $this->certs_image,
                "certs_published_date" => $this->certs_published_date,
                "certs_datetime" => $this->certs_datetime,
                "certs_aid" => $this->certs_aid,
         
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    public function active()
    {
        try {
            $sql = "update {$this->tblcerts} set ";
            $sql .= "certs_is_active = :certs_is_active, ";
            $sql .= "certs_datetime = :certs_datetime ";
            $sql .= "where certs_aid  = :certs_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "certs_is_active" => $this->certs_is_active,
                "certs_datetime" => $this->certs_datetime,
                "certs_aid" => $this->certs_aid,
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
            $sql .= "from {$this->tblcerts} ";
            $sql .= "where certs_title like :certs_title ";
            $sql .= "order by certs_is_active desc, ";
            $sql .= "certs_title asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "certs_title" => "%{$this->certs_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}