<?php

Class ProgLang {
    // row 8
    public $proglang_aid;
    public $proglang_title;
    public $proglang_description;
    public $proglang_image;
    public $proglang_is_active;
    public $proglang_published_date;
    public $proglang_created;
    public $proglang_datetime;
    
    public $proglang_search;
    public $connection;
    public $lastInsertedId;
    public $tblproglang;

    public function __construct($db) {
        $this->connection = $db;
        $this->tblproglang = "tbl_proglang";
    }

    public function create() {
        try {
             $sql = "insert into {$this->tblproglang} ";
             $sql .= "( proglang_title, ";
             $sql .= "proglang_description, ";
             $sql .= "proglang_image, ";
             $sql .= "proglang_is_active, ";
             $sql .= "proglang_published_date, ";
             $sql .= "proglang_created, ";
             $sql .= "proglang_datetime ) values ( ";
             $sql .= ":proglang_title, ";
             $sql .= ":proglang_description, ";
             $sql .= ":proglang_image, ";
             $sql .= ":proglang_is_active, ";
             $sql .= ":proglang_published_date, ";
             $sql .= ":proglang_created, ";
             $sql .= ":proglang_datetime ) ";
             $query = $this->connection->prepare($sql);
             $query->execute([
                "proglang_title" => $this->proglang_title,
                "proglang_description" => $this->proglang_description,
                "proglang_image" => $this->proglang_image,
                "proglang_is_active" => $this->proglang_is_active,
                "proglang_published_date" => $this->proglang_published_date,
                "proglang_description" => $this->proglang_description,
                "proglang_created" => $this->proglang_created,
                "proglang_datetime" => $this->proglang_datetime,
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
            $sql .= "from {$this->tblproglang} ";
            $sql .= "order by proglang_is_active desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    public function delete()
    {
        try {
            $sql = "delete from {$this->tblproglang} ";
            $sql .= "where proglang_aid = :proglang_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "proglang_aid" => $this->proglang_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    public function update()
    {
        try {
            $sql = "update {$this->tblproglang} set ";
            $sql .= "proglang_title = :proglang_title, ";
            $sql .= "proglang_description = :proglang_description, ";
            $sql .= "proglang_image = :proglang_image, ";     
            $sql .= "proglang_published_date = :proglang_published_date, ";
            $sql .= "proglang_datetime = :proglang_datetime ";
            $sql .= "where proglang_aid = :proglang_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "proglang_title" => $this->proglang_title,
                "proglang_description" => $this->proglang_description,
                "proglang_image" => $this->proglang_image,
                "proglang_published_date" => $this->proglang_published_date,
                "proglang_datetime" => $this->proglang_datetime,
                "proglang_aid" => $this->proglang_aid,
         
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    public function active()
    {
        try {
            $sql = "update {$this->tblproglang} set ";
            $sql .= "proglang_is_active = :proglang_is_active, ";
            $sql .= "proglang_datetime = :proglang_datetime ";
            $sql .= "where proglang_aid  = :proglang_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "proglang_is_active" => $this->proglang_is_active,
                "proglang_datetime" => $this->proglang_datetime,
                "proglang_aid" => $this->proglang_aid,
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
            $sql .= "from {$this->tblproglang} ";
            $sql .= "where proglang_title like :proglang_title ";
            $sql .= "order by proglang_is_active desc, ";
            $sql .= "proglang_title asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "proglang_title" => "%{$this->proglang_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}