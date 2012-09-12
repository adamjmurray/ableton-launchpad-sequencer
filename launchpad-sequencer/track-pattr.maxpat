{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 5,
			"minor" : 1,
			"revision" : 9
		}
,
		"rect" : [ 471.0, 693.0, 403.0, 293.0 ],
		"bglocked" : 0,
		"defrect" : [ 471.0, 693.0, 403.0, 293.0 ],
		"openrect" : [ 0.0, 0.0, 0.0, 0.0 ],
		"openinpresentation" : 0,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 0,
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 0,
		"toolbarvisible" : 1,
		"boxanimatetime" : 200,
		"imprint" : 0,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"boxes" : [ 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-9",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 92.0, 187.0, 157.0, 20.0 ],
					"restore" : [ 0.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 1,
							"parameter_steps" : 0,
							"parameter_annotation_name" : "",
							"parameter_exponent" : 1.0,
							"parameter_unitstyle" : 10,
							"parameter_mmax" : 2.0,
							"parameter_mmin" : 0.0,
							"parameter_type" : 0,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "durationScale",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "durationScale",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : ""
						}

					}
,
					"saved_object_attributes" : 					{
						"parameter_enable" : 1
					}
,
					"text" : "pattr durationScale @thru 0",
					"varname" : "durationScale"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-8",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 60.0, 214.0, 151.0, 20.0 ],
					"restore" : [ 0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 1,
							"parameter_steps" : 0,
							"parameter_annotation_name" : "",
							"parameter_exponent" : 1.0,
							"parameter_unitstyle" : 10,
							"parameter_mmax" : 127.0,
							"parameter_mmin" : 0.0,
							"parameter_type" : 1,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "baseVelocity",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "baseVelocity",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : ""
						}

					}
,
					"saved_object_attributes" : 					{
						"parameter_enable" : 1
					}
,
					"text" : "pattr baseVelocity @thru 0",
					"varname" : "baseVelocity"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-3",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "int", "int", "float" ],
					"patching_rect" : [ 28.0, 158.0, 83.0, 20.0 ],
					"text" : "unpack 0 0 0."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-7",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 28.0, 243.0, 137.0, 20.0 ],
					"restore" : [ 60 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 1,
							"parameter_steps" : 0,
							"parameter_annotation_name" : "",
							"parameter_exponent" : 1.0,
							"parameter_unitstyle" : 10,
							"parameter_mmax" : 127.0,
							"parameter_mmin" : 0.0,
							"parameter_type" : 1,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "basePitch",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "basePitch",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : ""
						}

					}
,
					"saved_object_attributes" : 					{
						"parameter_enable" : 1
					}
,
					"text" : "pattr basePitch @thru 0",
					"varname" : "basePitch"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-6",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 28.0, 30.0, 30.0, 20.0 ],
					"saved_object_attributes" : 					{

					}
,
					"text" : "in 1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-4",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 209.0, 59.0, 57.0, 20.0 ],
					"text" : "zl ecils 1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-2",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 209.0, 23.0, 30.0, 20.0 ],
					"saved_object_attributes" : 					{

					}
,
					"text" : "in 2"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-1",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 209.0, 132.0, 118.0, 20.0 ],
					"text" : "poly~ pattern-pattr 8",
					"varname" : "pattern"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-5",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 247.0, 93.0, 56.0, 18.0 ],
					"text" : "target $1"
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-4", 0 ],
					"hidden" : 0,
					"midpoints" : [  ],
					"source" : [ "obj-2", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-7", 0 ],
					"hidden" : 0,
					"midpoints" : [  ],
					"source" : [ "obj-3", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-8", 0 ],
					"hidden" : 0,
					"midpoints" : [  ],
					"source" : [ "obj-3", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-9", 0 ],
					"hidden" : 0,
					"midpoints" : [  ],
					"source" : [ "obj-3", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"hidden" : 0,
					"midpoints" : [  ],
					"source" : [ "obj-4", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"hidden" : 0,
					"midpoints" : [  ],
					"source" : [ "obj-4", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"hidden" : 0,
					"midpoints" : [  ],
					"source" : [ "obj-5", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 0 ],
					"hidden" : 0,
					"midpoints" : [  ],
					"source" : [ "obj-6", 0 ]
				}

			}
 ],
		"parameters" : 		{
			"obj-1.2::obj-12" : [ "end[1]", "end", 0 ],
			"obj-1.8::obj-1" : [ "sequence[7]", "sequence", 0 ],
			"obj-1.4::obj-1" : [ "sequence[3]", "sequence", 0 ],
			"obj-1.5::obj-11" : [ "start[4]", "start", 0 ],
			"obj-1.6::obj-1" : [ "sequence[5]", "sequence", 0 ],
			"obj-1.7::obj-11" : [ "start[6]", "start", 0 ],
			"obj-1.2::obj-11" : [ "start[1]", "start", 0 ],
			"obj-1.3::obj-12" : [ "end[2]", "end", 0 ],
			"obj-1.5::obj-12" : [ "end[4]", "end", 0 ],
			"obj-1.1::obj-12" : [ "end", "end", 0 ],
			"obj-1.6::obj-12" : [ "end[5]", "end", 0 ],
			"obj-1.7::obj-12" : [ "end[6]", "end", 0 ],
			"obj-1.2::obj-2" : [ "ptype[1]", "ptype", 0 ],
			"obj-1.8::obj-2" : [ "ptype[7]", "ptype", 0 ],
			"obj-1.1::obj-11" : [ "start", "start", 0 ],
			"obj-1.3::obj-11" : [ "start[2]", "start", 0 ],
			"obj-1.4::obj-2" : [ "ptype[3]", "ptype", 0 ],
			"obj-1.6::obj-2" : [ "ptype[5]", "ptype", 0 ],
			"obj-8" : [ "baseVelocity", "baseVelocity", 0 ],
			"obj-1.7::obj-1" : [ "sequence[6]", "sequence", 0 ],
			"obj-9" : [ "durationScale", "durationScale", 0 ],
			"obj-1.2::obj-1" : [ "sequence[1]", "sequence", 0 ],
			"obj-1.8::obj-11" : [ "start[7]", "start", 0 ],
			"obj-1.3::obj-2" : [ "ptype[2]", "ptype", 0 ],
			"obj-1.4::obj-12" : [ "end[3]", "end", 0 ],
			"obj-1.5::obj-1" : [ "sequence[4]", "sequence", 0 ],
			"obj-1.1::obj-1" : [ "sequence", "sequence", 0 ],
			"obj-1.7::obj-2" : [ "ptype[6]", "ptype", 0 ],
			"obj-1.8::obj-12" : [ "end[7]", "end", 0 ],
			"obj-1.3::obj-1" : [ "sequence[2]", "sequence", 0 ],
			"obj-1.4::obj-11" : [ "start[3]", "start", 0 ],
			"obj-1.5::obj-2" : [ "ptype[4]", "ptype", 0 ],
			"obj-7" : [ "basePitch", "basePitch", 0 ],
			"obj-1.1::obj-2" : [ "ptype", "ptype", 0 ],
			"obj-1.6::obj-11" : [ "start[5]", "start", 0 ]
		}

	}

}
